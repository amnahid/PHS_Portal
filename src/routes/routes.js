const express = require('express');
const app = require('../app');

const postController = require('./posts.route')

const route = express.Router()

route.use("/posts", postController)

module.exports = route