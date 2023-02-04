const jwt = require('jsonwebtoken');

const userModel = require("../database/models/user.model")
const otpManager = require("../utils/otp.util")

// scaffolding
const userLogic = {}

// registering new user
userLogic.addNewUser = async (userData) => {
    const signedUser = await userModel.insertMany(userData)
    const signUppedUser = { ...signedUser[0]._doc }
    // getting otp
    otpManager.generate(signUppedUser.email)
    // generating jwt token
    signUppedUser.token = jwt.sign({ user: signUppedUser._id, rank: signUppedUser.rank, email: signUppedUser.email }, process.env.PHS_JWT_SIGN_UP_SECRET_KEY, { expiresIn: "1 days" })
    // sending response
    return signUppedUser
}

// login
userLogic.logUser = async (user) => {
    // const loggedUser = await userModel.findOne({ email })
    const loggedInUserData = { ...user }
    // getting otp
    otpManager.generate(loggedInUserData.email)
    // generating jwt token
    loggedInUserData.token = jwt.sign({ user: loggedInUserData._id, rank: loggedInUserData.rank, email: loggedInUserData.email }, process.env.PHS_JWT_USER_LOGGING_SECRET_KEY, { expiresIn: "1 days" })
    // sending response
    return loggedInUserData
}

// verifying OTP
userLogic.validateOTP = async (token, otp) => {
    const validationData = {}
    const decodedToken = jwt.verify(token, process.env.PHS_JWT_SIGN_UP_SECRET_KEY, (err, payload) => {
        if (err) {
            return jwt.verify(token, process.env.PHS_JWT_USER_LOGGING_SECRET_KEY)
        } else {
            if (payload.rank === "NEW") userModel.findByIdAndUpdate(payload.user, { rank: "MANGO" })
            return payload
        }
    })
    console.log(decodedToken, otp)
    const validOTP = await otpManager.verify(decodedToken.email, otp)
    validationData.message = validOTP ? "Verification successful!" : "Verification failed!"
    validationData.token = validOTP ? jwt.sign({ user: decodedToken.user }, process.env.PHS_JWT_SIGN_IN_SECRET_KEY, { expiresIn: "1 days" }) : null
    return validationData
}

// get user profile 
userLogic.getUserProfile = async (userID) => {
    return userModel.findById(userID)
}

module.exports = userLogic