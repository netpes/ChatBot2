const mongoose = require('mongoose');

const user_schema = mongoose.Schema({
    name: {type:String, required: true},
    password: {type:String, required: true},
    email: {type: String, required: true},
    role: {type:String, required: true, default: 'user'},
    chatId: {type:Array, required: false}
})

module.exports = mongoose.model("users" , user_schema);