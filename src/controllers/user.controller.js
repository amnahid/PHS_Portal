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
                message: `User with same ${existsUserName ? "name" : ""}${existsUserEmail && existsUserName ? " and " : ""}${existsUserEmail ? "email" : ""} exists`
            })
        } else {
            const newUserData = { name, profilePic, email, rank: "NEW" }
            const signedUserData = await userLogic.addNewUser(newUserData)
            res.status(201).json({
                data: signedUserData,
                message: "Signup successful!"
            })
        }
    } catch (err) {
        next(err)
    }
}

// OTP verify
userController.verifyOTP = async (req, res, next) => {
    try {
        const token = req.headers.token.split(" ")[1]
        const otp = req.body.otp
        const validationData = await userLogic.validateOTP(token, otp)
        console.log(validationData)
        res.status(200).json({
            data: { token: validationData.token },
            message: validationData.message
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

// login
userController.login = async (req, res) => {
    try {
        const { email } = req.body
        const existsUserEmail = await userModel.findOne({ email })._doc
        if (existsUserEmail) {
            const signedUserData = await userLogic.logUser(existsUserEmail)
            res.status(201).json({
                data: signedUserData,
                message: "Login successful!"
            })
        } else {
            res.status(409).json({
                data: null,
                message: `User doesn't exists`
            })
        }
    } catch (err) {
        next(err)
    }
}

// get user profile
userController.userProfile = async (req, res) => {
    const userID = req.params.id
    const userData = await userLogic.getUserProfile(userID)
    res.status(200).json(userData)
}

module.exports = userController