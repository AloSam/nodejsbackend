const express = require('express');
const router = express.Router();
const response = require('../../network/response');

router.get('/', function(req,res){
    console.log(req.headers);
    res.header({
        "custom-header":"Nuestro valor personalizado",
    })
    response.success(req, res, 'Lista de mensajes', 201);
});

router.post('/', function(req,res){
    if(req.query.error == "ok"){
        response.error(req, res, 'Error simulado', 500, 'Es solo una simulación de los errores');
    }
    else{
    response.success(req, res, 'Creado correctamente', 201);
    }
});

router.delete('/', function(req,res){
    console.log(req.query);
    response.success(req, res, 'borrado correctamente', 201);
});

module.exports = router;