const userModel = require("../database/models/user.model")
const userLogic = require("../logic/user.logic")

//scaffolding
const userController = {}

// signup new user
userController.signup = async (req, res, next) => {
    try {
        const { name, profilePic, email } = req.body
        const existsUserName = await userModel.findOne({ name })
        const existsUserEmail = await userModel.findOne({ email })
        if (existsUserName || existsUserEmail) {
            res.status(409).json({
                    data: null,
                    message: `User with same ${existsUserName?"name":""}${existsUserEmail&&existsUserName?" and ":""}${existsUserEmail?"email":""} exists`
            })
        } else {
            const newUserData = { name, profilePic, email, rank: "NEW" }
            userLogic.addNewUser(newUserData, res, next)
        }
    } catch (err) {
        next(err)
    }
}

// get user profile
userController.userProfile = (req, res) => {

}

module.exports = userController