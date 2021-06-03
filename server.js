const express = require('express');

//const router = require('./components/message/network');
const router = require('./network/routes');

var app = express();
app.use(express.json());
// app.use(router); // se anula debido a que router está en network.js
router(app);


app.use('/app', express.static('public')); // carpeta para objetos

app.listen(3000);
console.log('La aplicación está escuchando en http://localhost:3000');