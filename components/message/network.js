const express = require('express');
const multer = require('multer');

const config = require('../../config')

const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

const upload = multer({
    dest: 'public/'+config.filesRoute+'/'
})

router.get('/', function(req,res){
    const filterMessages = req.query.chat || null;
    controller.getMessages(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.post('/', upload.single('file'), function(req,res){

    console.log(req.file);
    controller.addMessage(req.body.user, req.body.message,req.body.chat, req.file)
    .then((fullMessage) => {response.success(req, res, fullMessage, 201)})
    .catch(e => {
        response.error(req, res, 'Información inválida', 400, 'Error en el controlador')
    });
});

router.delete('/:id', function(req,res){
    controller.deleteMessage(req.params.id)
        .then(() => {
             response.success(req, res,`Id ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 400, e);
        })
   
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