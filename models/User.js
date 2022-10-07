const { model, Schema } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthdate: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model('User', UserSchema);