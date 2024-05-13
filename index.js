//Importação das bibliotecas necessárias
const express = require('express');
const cors = require('cors');

//Declarando a função do express como variável
const app = express();

//Importação da conexão com a Data Base
const connection = require('./mysql');

//Definição da porta do servidor
const port = 3000;

// Configurações do Express
app.use(express.json());

// Configuração do CORS
app.use(cors());

//Teste de conexão da porta pelo postman/thunderclient e console
app.get('/', (req, res) => {
  res.send('Bem-vindo a Hogwarts!');
});

//------------------------------------------//
    
// Criando um array de clientes
let clientes = [
     
];

// Rota para listar todos os clientes
app.get("/clientes", (req, res) => {
    const query = 'SELECT * FROM clientes';
    connection.query(query, (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: "Erro ao buscar clientes" });
            return;
        }
        res.json(results);
    });
});

// Rota para obter um cliente por ID
app.get("/clientes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const query = 'SELECT * FROM clientes WHERE id = ?';
    connection.query(query, [id], (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: "Erro ao buscar cliente" });
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: "Cliente não encontrado" });
        }
    });
});

// Rota para adicionar um novo cliente
app.post("/clientes", (req, res) => {
    const newCliente = req.body;
    const query = 'INSERT INTO clientes SET ?';
    connection.query(query, newCliente, (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: "Erro ao adicionar cliente" });
            return;
        }
        res.status(201).json({ message: "Cliente adicionado com sucesso" });
    });
});

// Rota para atualizar um cliente
app.put("/clientes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updateCliente = req.body;
    const query = 'UPDATE clientes SET ? WHERE id = ?';
    connection.query(query, [updateCliente, id], (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: "Erro ao atualizar cliente" });
            return;
        }
        res.json({ message: "Cliente atualizado com sucesso" });
    });
});

// Rota para remover um cliente
app.delete("/clientes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const query = 'DELETE FROM clientes WHERE id = ?';
    connection.query(query, [id], (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: "Erro ao remover cliente" });
            return;
        }
        res.json({ message: "Cliente removido com sucesso" });
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
