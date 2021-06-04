const express = require('express');

const db = require('./db');

const router = require('./network/routes');

db('mongodb+srv://user:1234@cluster0.k7bnf.mongodb.net/telegram?retryWrites=true&w=majority');

var app = express();
app.use(express.json());
router(app);


app.use('/app', express.static('public')); // carpeta para objetos

app.listen(3000);
console.log('La aplicación está escuchando en http://localhost:3000');