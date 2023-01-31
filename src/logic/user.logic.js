const jwt = require('jsonwebtoken');

const userModel = require("../database/models/user.model")
const otpManager = require("../utils/otp.util")

// scaffolding
const userLogic = {}

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

userLogic.validateOTP = async (token, otp) => {
    const validationData = {token:null, message:null}
    const decodedToken = jwt.decode(token, process.env.PHS_JWT_SIGN_UP_SECRET_KEY)
    const validOTP = await otpManager.verify(decodedToken.email, otp)
    if (validOTP) {
        userModel.findByIdAndUpdate(decodedToken.user, { rank: "MANGO" })
        validationData.message = "Verification successful!"
        validationData.token = jwt.sign({ user: decodedToken.user }, process.env.PHS_JWT_SIGN_IN_SECRET_KEY, { expiresIn: "1 days" })
        return validationData
    } else {
        validationData.message = "Verification failed!"
        return validationData
    }
}

module.exports = userLogic