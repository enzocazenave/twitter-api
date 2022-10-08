const { Router } = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser, renewToken, editUser } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validators');
const { validateJWT } = require('../middlewares/jwt-validate');

const router = Router();

router.post('/register', 
    [
        check('name', 'Your name is required').not().isEmpty(),
        check('username', 'Your username is required').not().isEmpty(),
        check('birthdate', 'Your birthdate is required').not().isEmpty(),
        check('email', 'Your email is required').isEmail(),
        check('password', 'Password must be 6 characters or more').isLength({ min: 6 }),
        fieldValidator
    ],
    registerUser
);

router.post('/login',
    [
        check('email', 'Your email is required').isEmail(),
        check('password', 'Password must be 6 characters or more').isLength({ min: 6 }),
        fieldValidator
    ],
    loginUser
);

router.post('/edit', [], editUser);

router.get('/renew', validateJWT, renewToken);

module.exports = router;