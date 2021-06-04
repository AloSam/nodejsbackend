
//mock
// const list = [];

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
    //list.push(message); //mock
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages() {
    //return list; //mock
    const messages = await Model.find();
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

module.exports = { 
    add: addMessage, 
    list: getMessages,
    //get
    update: updateText
    //delete
};