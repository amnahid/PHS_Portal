const express = require('express');
const postController = require('../controllers/posts.controller');


const postRouter = express.Router()

// fro getting timeline posts
.get('/', postController.timeLinePosts)

// for uploading a new post
.post('/', postController.uploadPost)

//
// .patch('/', postController.updatePost)

// comment 
.post('/:postID/comment', )

module.exports = postRouter 