const { check } = require('express-validator');

// registration validation
exports.signupValidator = [
    check('name', 'Name must be between 3 to 50 characters')
        .not()
        .isEmpty()
        .withMessage('Name field is required')
        .isLength({
            min: 3, max: 50
        }),
    check('email', 'Name must be between 3 to 50 characters')
        .isEmail()
        .matches(/.+\@.+\..+/)
        .withMessage('email must conttain @'),
    check("password", "Password is required").notEmpty(),
    check('password')
        .isLength({ min: 6 })
        .withMessage("Password length must be 6 characters")
];

// login validator
exports.signinValidator = [
    check('email', 'Name must be between 3 to 50 characters')
        .isEmail()
        .matches(/.+\@.+\..+/)
        .withMessage('email must conttain @'),
    check("password", "Password is required").notEmpty(),
    check('password')
        .isLength({ min: 6 })
        .withMessage("Password length must be 6 characters")
]