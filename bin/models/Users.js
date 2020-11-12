const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    nickname: String,
    password: String,
    picture: String
});

// Convertir a modelo
const Users = mongoose.model('Users', usersSchema);

module.exports = Users;