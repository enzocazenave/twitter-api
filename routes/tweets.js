const { Router } = require('express');
const { createTweet, getTweets, likeTweet, getProfileInfoAll, getSearchedUsers, getSuggestedUsers } = require('../controllers/tweets');

const router = Router();

router.post('/tweets', [], createTweet);

router.get('/tweets', [], getTweets);

router.patch('/tweets', [], likeTweet);

router.post('/user', [], getProfileInfoAll);

router.post('/search_users', [], getSearchedUsers)

router.get('/suggested_users', [], getSuggestedUsers)

module.exports = router;