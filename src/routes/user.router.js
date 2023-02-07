const express = require('express');

const userController = require('../controllers/user.controller');
const authUtil = require('../utils/auth.util');


const userRouter = express.Router()

// signup
.post('/signup', userController.signup)

// login
.post('/login', userController.login)

// verify OTP
.post('/verify', userController.verifyOTP)

// getting timeline posts
.get('/:id', userController.userProfile)

// update user profile data
.patch('/update', authUtil.verifyJWT, authUtil.verifyRank, userController.updateUserProfile)

module.exports = userRouter 