const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err || user) return res.json({ error: "User already exists" });

            const newUser = new User(req.body)
            newUser.save((err, success) => {
                if (err) return res.json({ error: "Something went wrong" });
                return res.json({ msg: "User successfully registed" });
            });
        });
}



exports.signin = (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    User.findOne({ email })
        .exec((err, user) => {
            if (err || !user) return res.json({ error: "User dose not exists with this email" });
            // check password match or not
            if (!user.authenticate(password)) return res.json({ error: "Email or password dose not match" });

            //  token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.cookie('token', token, { expiresIn: "1d" });
            const { _id, name, email, role } = user;
            return res.json({
                token,
                user: { _id, name, email, role }
            });
        });
}


exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        msg: "User successfully logout"
    })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth'
});


exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id

    if (!user) {
        return res.status(403).json({
            error: "Access Denaied"
        })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {  // 0 means default user/student
        return res.status(403).json({
            error: "Admin resources! Access Denied"
        })
    }
    next()
}

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }

        req.profile = user
        next()
    })
}