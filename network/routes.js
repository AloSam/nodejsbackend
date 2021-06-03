//todas las llamadas de message las gestiona el componente message
const express = require('express');
const message = require('../components/message/network');

const routes = function (server) {
    server.use('/message', message) //permite quitar message en los metodos get,post
}

module.exports = routes;