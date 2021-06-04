const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

router.get('/', function(req,res){

    controller.getMessages()
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.post('/', function(req,res){

    controller.addMessage(req.body.user, req.body.message)
    .then((fullMessage) => {response.success(req, res, fullMessage, 201)})
    .catch(e => {
        response.error(req, res, 'Información inválida', 400, 'Error en el controlador')
    });
});

router.delete('/', function(req,res){
    console.log(req.query);
    response.success(req, res, 'borrado correctamente', 201);
});

router.patch('/:id', function(req,res){
    //console.log(req.params.id); //obtener id
    console.log(req.params.id, req.body.message);
    controller.updateMessage(req.params.id, req.body.message)
    
        .then((data) => {
            response.success(req,res, data, 200);
        })
        .catch((e) => {
            response.error(req, res, 'Error Interno', 500);
        })
})

module.exports = router;