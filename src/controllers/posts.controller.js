const postLogic = require('../logic/posts.logic');

//scaffolding
const postController = {}

// get timeline posts
postController.timeLinePosts = async (req, res, next) => {
    try {
        const timeLinePosts = await postLogic.getTimeLinePosts()
        // console.log("coming from controller line 2 " + JSON.stringify(postLogic.getTimeLinePosts()));
        res.status(200).json({
            data: timeLinePosts,
            message: "Here is your timeline posts!"
        })
    } catch (err) {
        next(err)
    }
}

// upload a new post
postController.uploadPost = async (req, res, next) => {
    try {
        const uploadedPost = await postLogic.addPost(req.body)
        res.status(201).json({
            data: uploadedPost,
            message: "Post Uploaded!"
        })
    } catch (err) {
        next(err)
    }
}

// update a post
postController.updatePost = async (req, res) => {
    const postID = req.params.postID

}

module.exports = postController