const { response } = require('express');

const registerUser = async(req, res = response) => {
    const {
        name,
        username,
        birthdate,
        email,
        password
    } = req.body;

    res.status(201).json({
        ok: true,
        name,
        username,
        birthdate,
        email,
        password
    })
}

module.exports = {
    registerUser,
}