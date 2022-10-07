const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');


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

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            username: user.username
        })
    } catch(error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: '[ERROR] Please talk with the administrator'
        })
    }
}

module.exports = {
    registerUser,
}