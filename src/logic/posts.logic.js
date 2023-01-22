const postsModel = require('../database/models/posts.model')

// scaffolding
const postLogic = {}

postLogic.getTimeLinePosts = async() => {
    try {
        const timeLinePost = await postsModel.find({})
        // console.log("coming from logic "+timeLinePost);
        return timeLinePost
    } catch (err) {
        console.log(err)
    }
}

postLogic.addPost = (post) => {
    try{
        postsModel.insertMan(post)
    } catch (err) {
        throw new Error("Failed to upload the post!")
    }
}

module.exports = postLogic