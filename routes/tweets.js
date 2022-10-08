const { Router } = require('express');
const { createTweet, getTweets, likeTweet, getProfileInfo, getProfileInfoAll } = require('../controllers/tweets');

const router = Router();

router.post('/tweets', [], createTweet);

router.get('/tweets', [], getTweets);

router.patch('/tweets', [], likeTweet);

router.post('/user', [], getProfileInfo);

router.post('/all_user', [], getProfileInfoAll);

module.exports = router;