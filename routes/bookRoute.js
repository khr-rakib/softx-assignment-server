const router = require('express').Router();
const { getAllBooks, create, singleBook, update, remove, bookById, getAllActiveBook, inActiveBook, activeBook, photo, statusChange } = require('../controllers/bookController');
const { requireSignin, isAuth, isAdmin, userById } = require('../controllers/authController');

// book routes
router.get('/books', getAllBooks);
router.get('/book/active', getAllActiveBook);
router.get('/book/:bookId', singleBook);

// librarian book routes
router.post('/book/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put('/book/:bookId/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('/book/:bookId/:userId', requireSignin, isAuth, isAdmin, remove);
// active/inActive route
router.get('/book/status/active/:bookId/:userId', requireSignin, isAuth, isAdmin, activeBook);
router.get('/book/status/inactive/:bookId/:userId', requireSignin, isAuth, isAdmin, inActiveBook);
// photo route
router.get('/book/photo/:bookId', photo);

router.param('userId', userById);
router.param('bookId', bookById);

module.exports = router;