const userModel = require("../database/models/user.model")
const userLogic = require("../logic/user.logic")
const firebaseDatabase = require("../database/firebase.database")

//scaffolding
const userController = {}

// signup new user
userController.signup = async (req, res, next) => {
    try {
        const { name, email } = req.body
        const { profilePic } = req.files
        if (name && email) {
            const existsUserName = await userModel.findOne({ name })
            const existsUserEmail = await userModel.findOne({ email })
            if (existsUserName || existsUserEmail) {
                res.status(409).json({
                    data: null,
                    message: `User with same ${existsUserName ? "name" : ""}${existsUserEmail && existsUserName ? " and " : ""}${existsUserEmail ? "email" : ""} exists`
                })
            } else {
                const newUserData = { name, email, rank: "NEW" }
                const signedUserData = await userLogic.addNewUser(newUserData, profilePic[0])
                res.status(201).json({
                    data: signedUserData,
                    message: "Signup successful!"
                })
            }
        } else {
            res.status(409).json({
                data: null,
                message: `${name ? "" : "name"}${!name && !email ? " and " : ""}${email ? "" : "email"} required`
            })
        }
    } catch (err) {
        next(err)
    }
}

// OTP verify
userController.verifyOTP = async (req, res, next) => {
    try {
        const tokens = { bearerToken: req.headers.bearertoken.split(" ")[1] }
        const otp = req.body.otp
        const validationData = await userLogic.validateOTP(tokens, otp)
        console.log(validationData)
        res.status(200).json({
            data: validationData.data,
            message: validationData.message
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

// login
userController.login = async (req, res, next) => {
    try {
        const { email } = req.body
        const findUser = await userModel.findOne({ email })
        const existsUser = { ...findUser._doc }
        if (existsUser) {
            const signedUserData = await userLogic.logUser(existsUser)
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

// firebase test
userController.firebaseTest = async (req, res) => {
    const token = req.headers.token.split(" ")[1]
    firebaseDatabase.signInWithCustomToken(token)
}

module.exports = userController