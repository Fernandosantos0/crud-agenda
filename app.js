/* Importando os módulos */
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const colors = require('colors');
const { join } = require('path');

/* Invocando o framework do express */
const app = express();

/* Ivocando a conexão com o banco de dados */
const conn = require('./db');

/* Configurando o envio de dados pelo body */
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/* Configurando o view engine */
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

/* Segurança */
app.use(helmet());
app.use(cors());

/* Pasta estática */
app.use(express.static(join(__dirname, 'public')));

/* Rotas */
app.get('/', (req, res) => {
    /* Query SQL */
    const sql = 'SELECT * FROM agenda.contatos';

    /* Execucando a query */
    conn.query(sql, (err, dados) => {
        if(err) {
            console.log('Houve um erro ao resgatar os contatos'.red.bold)
            console.error(err);
            res.status(303).redirect('/');
            return;
        }

        res.status(200).render('home', { contatos: dados });
    });
});

app.get('/add', (req, res) => {
    res.status(200).render('add');
});

app.post('/add', (req, res) => {
    const { nome, telefone, celular, email } = req.body;

    /* Query SQL */
    const sql = 'INSERT INTO agenda.contatos(??, ??, ??, ??) VALUE(?, ?, ?, ?)';

    /* Valores para guardar no banco de dados */
    const valores = ['nome', 'telefone', 'celular', 'email', nome, telefone, celular, email];

    /* Execucando a query */
    conn.query(sql, valores, (err, dados) => {
        if(err) {
            console.log('Houve um erro ao cadastrar o contato'.red.bold)
            console.error(err);
            res.status(303).redirect('/add');
            return;
        }

        res.status(303).redirect('/add')
    });
});

app.get('/edit/:id', (req, res) => {
    const { id } = req.params;

    /* Query SQL */
    const sql = 'SELECT * FROM agenda.contatos WHERE ?? = ?';

    const valores = ['id', id];

    /* Execucando a query */
    conn.query(sql, valores, (err, dados) => {
        if(err) {
            console.log('Houve um erro ao resgatar o contato'.red.bold)
            console.error(err);
            res.status(303).redirect('/');
            return;
        }

        const contato = dados[0]
        res.status(200).render('edit', { contato });
    });
});

app.post('/edit', (req, res) => {
    const { id, nome, telefone, celular, email } = req.body;

    /* Query SQL */
    const sql = 'UPDATE agenda.contatos SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?';

    const valores = ['nome', nome, 'telefone', telefone, 'celular', celular, 'email', email, 'id', id];

    /* Execucando a query */
    conn.query(sql, valores, (err, dados) => {
        if(err) {
            console.log('Houve um erro ao atualizar o contato'.red.bold)
            console.error(err);
            res.status(303).redirect(`/edit/${id}`);
            return;
        }

        res.status(200).redirect(`/edit/${id}`);
    });
});

app.post('/remove', (req, res) => {
    const { id } = req.body;

    /* Query SQL */
    const sql = 'DELETE FROM agenda.contatos WHERE ?? = ?';

    const valores = ['id', id];

    /* Executando a query */
    conn.query(sql, valores, (err, dados) => {
        if(err) {
            console.log('Houve um erro ao remover o contato'.red.bold)
            console.error(err);
            res.status(303).redirect(`/edit/${id}`);
            return;
        }

        res.status(303).redirect('/');
    });
});

/* Subindo o servidor */
const port = 4000;
const host = 'localhost';
app.listen(port, host, () => {
    console.log(`Server ON - http://${host}:${port}`.green.bold);
});
