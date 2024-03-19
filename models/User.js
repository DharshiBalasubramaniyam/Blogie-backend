const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    age: {
        require: true,
        type: Number
    },
    email: {
        require: true,
        type: String
    }
});

const User = mongoose.model('User', userSchema)

module.exports = User;