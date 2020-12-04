const Book = require('../models/bookModel');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const ObjectId = require('mongoose').Types.ObjectId;


// book middleware
exports.bookById = (req, res, next, id) => {
    Book.findById(id)
        .exec((err, book) => {
            if (err || !book) {
                return res.status(400).json({
                    error: "Book not found"
                })
            }

            req.book = book;
            next();
        })
}
// for getting photo
exports.photo = (req, res, next) => {
    if (req.book.photo.data) {
        res.set('Content-Type', req.book.photo.contentType)
        return res.send(req.book.photo.data);
    }
    next();
}


exports.getAllBooks = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    Book.find()
        .select("-photo")
        .limit(limit)
        .exec((err, books) => {
            if (err) return res.json(err);
            res.json(books);
        })
}

exports.getAllActiveBook = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    Book.find({ active: true })
        .select("-photo")
        .limit(limit)
        .exec((err, books) => {
            if (err) return res.json(err);
            res.json(books);
        })
}

exports.singleBook = (req, res) => {
    req.book.photo = undefined;
    return res.json(req.book);
}



// admin
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        let book = new Book(fields);

        if (files.photo) {
            if (files.photo.size > 1048576) {
                return res.status(400).json({
                    error: "Image should be less then 1mb in size"
                });
            }

            book.photo.data = fs.readFileSync(files.photo.path);
            book.photo.contentType = files.photo.type;
        }

        book.save((err, result) => {
            if (err) return res.json(err)
            res.json(result);
        });
    })
}


exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        let book = req.book;
        book = _.extend(book, fields);

        if (files.photo) {
            if (files.photo.size > 1048576) {
                return res.status(400).json({
                    error: "Image should be less then 1mb in size"
                });
            }

            book.photo.data = fs.readFileSync(files.photo.path);
            book.photo.contentType = files.photo.type;
        }

        book.save((err, result) => {
            if (err) return res.json(err)
            res.json(result);
        });
    })
}

exports.remove = (req, res) => {
    let book = req.book;
    book.remove((err, deletedBook) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            "message": "Book deleted Successfully"
        })
    })
}


exports.activeBook = (req, res) => {
    const bookId = req.params.bookId
    Book.update(
        { _id: ObjectId(bookId) },
        {
            $set: {
                "active": true
            }
        }
    ).then(result => res.json(result))
}

exports.inActiveBook = (req, res) => {
    const bookId = req.params.bookId
    Book.update(
        { _id: ObjectId(bookId) },
        {
            $set: {
                "active": false
            }
        }
    ).then(result => res.json(result))
}
