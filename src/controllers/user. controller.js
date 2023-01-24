const userLogic = require("../logic/user.logic")

//scaffolding
const userController = {}

// signup new user
userController.signup = (req, res, next) => {
    try {
        const { name, profilePic, email } = req.body
        const newUserData = { name, profilePic,email, rank: "MANGO" }
        userLogic.signup(newUserData, res, next)
    } catch (err) {
        next(err)
    }
}

// get user profile
userController.userProfile = (req, res) => {

}

module.exports = userController