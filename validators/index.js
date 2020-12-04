const { validationResult } = require('express-validator');


exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors);
    if (errors) {
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(400).json({ error: firstError })
    }
    next();
}
