    // Importação da biblioteca mysql
    const mysql = require('mysql2');

    // Configuração da conexão
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'cliente',
        port: 3306
    });

    // Conectar ao banco de dados
    connection.connect(error => {
        if (error) {
            console.error('Erro ao conectar:', error.stack);
            return;
        }
        console.log('Conectado com o ID ' + connection.threadId);
    });

    module.exports = connection;

    process.on('SIGINT', () => {
        connection.end();
        console.log('Conexão com o banco de dados encerrada.');
        process.exit(0);
    });
