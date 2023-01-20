const express = require('express');
const postLogic = require('../logic/posts.logic');


const postController = express.Router()

.get('/', (req, res) => {
    res.send(JSON.stringify(postLogic.getPosts()))
})

.post('/', (req,res) => {
    console.log(req.body)
    postLogic.addPost(req.body)
})

module.exports = postController