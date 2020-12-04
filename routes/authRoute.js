const router = require('express').Router();

const { signup, signin, signout } = require('../controllers/authController');
const { signupValidator, signinValidator } = require('../validators/userValidation');

router.post('/signup', signupValidator, signup);
router.post('/signin', signinValidator, signin);
router.get('/signout', signout);

module.exports = router;