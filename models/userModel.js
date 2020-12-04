const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        max: 50
    },
    hashed_password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0 // 0 means student & 1 mean librarian
    },
    salt: String
}, { timestamps: true });


// virtual password field
userSchema.virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = uuidv4()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function (password) {
        return this._password
    });

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return "";

        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (error) {
            return "";
        }
    }
}


module.exports = mongoose.model('User', userSchema);