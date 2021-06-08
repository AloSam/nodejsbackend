//se va a encargar de todo lo que sucede
const socket  = require('../../socket').socket;
const store = require('./store');
const config = require('../../config');

function addMessage(user, message, chat, file){
    return new Promise((resolve,reject) => {
        if(!user || !message || !chat){
            console.error('[messageController] No hay usuario o mensaje');
            reject('Los datos son incorrectos');
        }

        let fileUrl = ''
        if(file)
        {
            fileUrl = config.host+':'+config.port+ config.publicRoute+'/'+config.filesRoute+'/';
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl,
        }
        store.add(fullMessage);

        socket.io.emit('message', fullMessage);

        resolve(fullMessage);
    })
    
}

function getMessages(filterChat){
    return new Promise((resolve, reject) => {
        resolve(store.list(filterChat));
    })
}

function updateMessage(id, message){
    return new Promise(async (resolve, reject) => {
        if(!id || !message)
        {
            reject('Invalid data');
        }
        else{
            const result = await store.update(id, message);
            resolve(result);
        }
        
        
    })
}

function deleteMessage(id)
{
    return new Promise((resolve, reject) => {
        if(!id)
        {
            reject('Id Invalido');
        }
        store.remove(id)
            .then(()=>{
                resolve();
            })
            .catch(e => {
                reject(e);
            });
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}