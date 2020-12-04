const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        trim: true,
        required: true,
        max: 100
    },
    author: {
        type: String,
        trim: true,
        required: true,
        max: 50
    },
    genre: {
        type: String
    },
    releaseDate: Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


module.exports = mongoose.model('book', bookSchema);