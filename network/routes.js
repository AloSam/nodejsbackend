//todas las llamadas de message las gestiona el componente message
const express = require('express');
const message = require('../components/message/network');
const user = require('../components/user/network');

const routes = function (server) {
    server.use('/message', message) //permite quitar message en los metodos get,post
    server.use('/user', user)
}

module.exports = routes;