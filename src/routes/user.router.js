const express = require('express');
const userController = require('../controllers/user. controller');


const userRouter = express.Router()

// signup
.post('/signup', userController.signup)

// fro getting timeline posts
.get('/:id', userController.userProfile)

module.exports = userRouter 