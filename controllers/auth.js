const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findByIdAndUpdate } = require('../models/User');


const registerUser = async(req, res = response) => {
    const { name, username, birthdate, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'An account with that email already exists'
            });
        }

        user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'An account with that username already exists'
            })
        }

        user = new User(req.body);
        
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const data = {
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
        }

        jwt.sign(data, process.env.SECRET_JWT_KEY, { expiresIn: '1h' }, (err, token) => {
            if (err) return res.status(400).json({
                ok: false,
                msg: 'Failed to generate token'
            });

            res.status(201).json({
                ok: true,
                ...data,
                token
            });
        });
    } catch(error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: '[ERROR] Please talk with the administrator'
        })
    }
}

const loginUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect credentials'
            });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect credentials'
            });
        }

        const data = {
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
        }

        jwt.sign(data, process.env.SECRET_JWT_KEY, { expiresIn: '1h' }, (err, token) => {
            if (err) return res.status(400).json({
                ok: false,
                msg: 'Failed to generate token'
            });

            res.status(201).json({
                ok: true,
                ...data,
                token
            });
        });
    } catch(error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: '[ERROR] Please talk with the administrator'
        })
    }
}

const renewToken = async(req, res = response ) => {
    const { id, name, username, email, birthdate, profile_img, profile_banner, bio, location, joined, followers, following, website, token } = req.body;
    const data = { id, name, username, email, birthdate, profile_img, profile_banner, bio, location, joined, followers, following, website, token };
    
    res.status(201).json({
        ok: true,
        ...data,
        token
    });
}

const editUser = async(req, res = response) => {
    const { id, name, bio, location, website } = req.body;

    const user = await User.findByIdAndUpdate(id, { name, bio, location, website }, { new: true });
   
    const data = {
        id,
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
    }

    jwt.sign(data, process.env.SECRET_JWT_KEY, { expiresIn: '1h' }, (err, token) => {
        if (err) return res.status(400).json({
            ok: false,
            msg: 'Failed to generate token'
        });

        res.status(201).json({
            ok: true,
            ...data,
            token
        });
    });
}

module.exports = {
    registerUser,
    loginUser,
    renewToken,
    editUser
}