const { model, Schema } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
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
    profile_img: {
        type: String,
    },
    profile_banner: {
        type: String,
    },
    bio: {
        type: String,
    },
    location: {
        type: String,
    },
    website: {
        type: String,
    },
    joined: {
        type: String,
    },
    followers: {
        type: 'number',
    },
    following: {
        type: 'number',
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model('User', UserSchema);