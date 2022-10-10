const { model, Schema } = require('mongoose');

const TweetSchema = Schema({
    owner: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
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