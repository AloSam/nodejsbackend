const express = require('express');
//const router = express.Router(); //router de express;

const response = require('./network/response');

var app = express();
app.use(express.json());
app.use('/app', express.static('public')); // carpeta para objetos


app.get('/message', function(req,res){
    console.log(req.headers);
    res.header({
        "custom-header":"Nuestro valor personalizado",
    })
    response.success(req, res, 'Lista de mensajes', 201);
});

app.post('/message', function(req,res){
    if(req.query.error == "ok"){
        response.error(req, res, 'Error simulado', 500, 'Es solo una simulación de los errores');
    }
    else{
    response.success(req, res, 'Creado correctamente', 201);
    }
});

app.delete('/message', function(req,res){
    console.log(req.query);
    response.success(req, res, 'borrado correctamente', 201);
});


app.listen(3000);
console.log('La aplicación está escuchando en http://localhost:3000');