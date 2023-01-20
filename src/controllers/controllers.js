const express = require('express');
const app = require('../app');

const postController = require('./posts.controller')

const controller = express.Router()

controller.use("/posts", postController)

module.exports = controller