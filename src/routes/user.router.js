const express = require('express');
const userController = require('../controllers/user.controller');


const userRouter = express.Router()

// signup
.post('/signup', userController.signup)

// login
.post('/login', userController.login)

// verify OTP
.post('/verify', userController.verifyOTP)

// getting timeline posts
.get('/:id', userController.userProfile)

module.exports = userRouter 