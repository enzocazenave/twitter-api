const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token in the request'
        });
    }

    try {
        const data = jwt.verify(token, process.env.SECRET_JWT_KEY);
        req.body = {...data, token};
    } catch(error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }
    
    next();
}

module.exports = {
    validateJWT
}