const express = require('express');
const { check } = require('express-validator')
const { signUp, deleteUser, updateUser, getExistingUser, login } = require('../controllers/users');

const router = express.Router();

router.post('/signup', [
    check('name', 'Please Enter your Name').not().isEmpty(),
    check('email', 'Please Enter your Email').isEmail(),
    check('password', 'Please Enter your Password').isLength({ minLength: 6})
], signUp)

router.delete('/delete/:id', deleteUser)
router.put('/update/:id', updateUser)
router.get('/user/:id', getExistingUser)
router.post('/login', login)

module.exports = router;