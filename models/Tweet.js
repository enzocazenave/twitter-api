const { model, Schema } = require('mongoose');

const TweetSchema = Schema({
    owner: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    likes: {
        type: 'number',
        required: true
    }
});

module.exports = model('Tweet', TweetSchema);