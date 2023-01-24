const express = require('express');
const app = require('../app');

const postRouter = require('./posts.route');
const userRouter = require('./user.router');

const route = express.Router()

route.use("/posts", postRouter)
route.use("/user", userRouter)

module.exports = route