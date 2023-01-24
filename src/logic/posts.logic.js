const postsModel = require('../database/models/posts.model')

// scaffolding
const postLogic = {}

postLogic.getTimeLinePosts = async () => {
    try {
        const timeLinePost = await postsModel.find({})
        // console.log("coming from logic "+timeLinePost);
        return timeLinePost
    } catch (err) {
        console.log(err)
    }
}

postLogic.addPost = async (postData,res, next) => {
    try {
        const uploadedPost = await postsModel.insertMany(postData)
        res.status(201).json({
            data: uploadedPost,
            message: "Post Uploaded!"
        })
    } catch (err) {
        next(err)
    }
}

module.exports = postLogic