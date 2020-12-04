const router = require('express').Router();
const { sendRequest, allRequest } = require('../controllers/requestController');
const { requireSignin, isAuth, isAdmin, userById } = require('../controllers/authController');
const { bookById } = require('../controllers/bookController');

router.get('/book/request/all/:userId', requireSignin, isAuth, isAdmin, allRequest);
router.post('/book/request/:bookId/:userId', requireSignin, isAuth, sendRequest);

router.param('userId', userById);
router.param('bookId', bookById);

module.exports = router;