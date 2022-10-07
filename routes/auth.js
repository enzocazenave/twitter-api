const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { registerUser } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validators');

const router = Router();

router.post('/register', 
    [
        check('name', 'Your name is required').not().isEmpty(),
        check('username', 'Your username is required').not().isEmpty(),
        check('birthdate', 'Your birthdate is invalid').custom(isDate),
        check('email', 'Your email is required').isEmail(),
        check('password', 'Password must be 6 characters or more').isLength({ min: 6 }),
        fieldValidator
    ],
    registerUser
);

module.exports = router;