const db = require('mongoose');
const Model = require('./model');

db.Promise = global.Promise;

//mongodb+srv://user:1234@cluster0.k7bnf.mongodb.net/telegram?retryWrites=true&w=majority
db.connect('mongodb+srv://user:1234@cluster0.k7bnf.mongodb.net/telegram?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})//conexion a mongo db

console.log('[db] Conectada con éxito');


function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages(filterUser) {
    let filter = {};
    if(filterUser !== null)
    {
        filter = { user: filterUser }
    }
    const messages = await Model.find(filter);
    return messages

}

async function updateText(id, message){
    const foundMessage = await Model.findOne({
        _id: id
    });
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

function removeMessage(id){
    return Model.deleteOne({
        _id:id
    });
}

module.exports = { 
    add: addMessage, 
    list: getMessages,
    //get
    update: updateText,
    remove: removeMessage
};