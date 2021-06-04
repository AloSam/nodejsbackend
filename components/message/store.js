
//mock
// const list = [];

const db = require('mongoose');

//mongo "mongodb+srv://cluster0.k7bnf.mongodb.net/myFirstDatabase" --username user


function addMessage(message) {
    list.push(message);
}

function getMessages() {
    return list;
}

module.exports = { 
    add: addMessage, 
    list: getMessages,
    //get
    //update
    //delete
};