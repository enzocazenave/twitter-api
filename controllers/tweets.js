const { response } = require('express');
const Tweet = require('../models/Tweet');
const User = require('../models/User');

const createTweet = async(req, res = response) => {
    
    const { owner, text } = req.body;
    
    const created_tweet = new Tweet({ owner, text, likes: 0 });
    created_tweet.save();

    res.status(201).json({
        ok: true,
        msg: 'Tweet uploaded successfully',
        tweet: {
            _id: created_tweet.id,
            owner: created_tweet.owner,
            text: created_tweet.text,
            likes: created_tweet.likes
        }
    });
}

const getTweets = async(req, res = response) => {
    
    const tweets = await Tweet.find().sort({ date: -1 });

    res.status(200).json({
        ok: true,
        msg: 'Get tweets',
        tweets
    })
}

const likeTweet = async(req, res = response) => {
    console.log(req.body);

    res.json({
        ok: true,
        msg: 'like'
    })
}

const getProfileInfo = async(req, res = response) => {
    const { id } = req.body;
    const user = await User.findById(id);

    res.status(200).json({
        ok: true,
        name: user.name,
        username: user.username,
        profile_img: user.profile_img
    })
}

const getProfileInfoAll = async(req, res = response) => {

    const { username } = req.body;  
    const user = await User.findOne({ username });

    res.status(200).json({
        ok: true,
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        birthdate: user.birthdate,
        profile_img: user.profile_img,
        profile_banner: user.profile_banner,
        bio: user.bio,
        location: user.location,
        joined: user.joined,
        followers: user.followers,
        following: user.following,
        website: user.website
    })
};

const getSearchedUsers = async(req, res = response) => {
    const { query } = req.body;

    const users = await User.find();
    const result = [];

    for (const user of users) {
        if (user.username.includes(query)) {
            result.push(user);
        }
    }

    res.status(200).json({
        ok: true,
        users: result
    })

}


module.exports = {
    createTweet,
    getTweets, 
    likeTweet,
    getProfileInfo,
    getProfileInfoAll,
    getSearchedUsers
}