const postsModel = require('../models/posts.model')

// scaffolding
const postLogic = {}

postLogic.getPosts = () => {
    return {
        title: "This is dummy title",
        media: ["photo1", "photo2"],
        author: "73h4e8r9q23h"
    }
}

postLogic.addPost = (post) => {
    postsModel.insertMany(post)
}

module.exports = postLogic