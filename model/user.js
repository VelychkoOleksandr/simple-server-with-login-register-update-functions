const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: String,
    password: String
});

const User = mongoose.model('User', userSchema, 'userData');
module.exports = User;