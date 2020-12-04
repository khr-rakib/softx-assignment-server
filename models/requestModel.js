const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const requestSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 50
    },
    email: {
        type: String,
        trim: true,
        required: true,
        max: 50
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        max: 14
    },
    book: {
        type: ObjectId,
        required: true,
        ref: "book"
    }
})


module.exports = mongoose.model('request', requestSchema);