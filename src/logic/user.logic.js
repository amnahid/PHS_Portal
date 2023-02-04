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

// verifying OTP
userLogic.validateOTP = async (token, otp) => {
    const validationData = {}
    const decodedToken = jwt.verify(token, process.env.PHS_JWT_SIGN_UP_SECRET_KEY)
    const validOTP = await otpManager.verify(decodedToken.email, otp)
    userModel.findByIdAndUpdate(decodedToken.user, { rank: "MANGO" })
    validationData.message = validOTP ? "Verification successful!" : "Verification failed!"
    validationData.token = validOTP ? jwt.sign({ user: decodedToken.user }, process.env.PHS_JWT_SIGN_IN_SECRET_KEY, { expiresIn: "1 days" }) : null
    return validationData
}

// login
userLogic
module.exports = userLogic