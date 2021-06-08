//npm i express socket.io

const express = require('express');
var app = express();
const server = require('http').Server(app);

const config = require('./config');

const cors = require('cors'); //para manejo de cabeceras
const socket = require('./socket');
const db = require('./db');
const router = require('./network/routes');

db(config.dbUrl);

app.use(cors);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

socket.connect(server);

router(app);

app.use(config.publicRoute, express.static('public'));


server.listen(config.port, function(){
    console.log('La aplicación está escuchando en '+ config.host+':'+config.port);
});
