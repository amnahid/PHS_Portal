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
        const { author, media, caption } = req.body // filtering post data
        const postData = { author, media, caption, status:"REVIEW" }
        // const uploadedPost = await postLogic.addPost(postData, res, next)
        postLogic.addPost(postData, res, next)
    } catch (err) {
        next(err)
    }
}

// update a post
postController.updatePost = async (req, res) => {
    const postID = req.params.postID

}

// comment 
postController.comment = async (req, res) => {
    const postID = req.params.postID
}

module.exports = postController