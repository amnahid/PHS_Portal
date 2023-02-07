const jwt = require('jsonwebtoken');

const userModel = require("../database/models/user.model");
const firebaseManager = require('../utils/firebase.util');
const otpManager = require("../utils/otp.util")

// scaffolding
const userLogic = {}

// registering new user
userLogic.addNewUser = async (userData, profilePic) => {
    const profilePicName = `${Date.now()}.jpg`
    const signedUser = await userModel.insertMany({profilePic: profilePicName, ...userData})
    const signUppedUser = { ...signedUser[0]._doc }
    firebaseManager.storeMedia(profilePic.data, `${signUppedUser._id}/${profilePicName}`) // second parameter is the path of the profile pic on firebase storage
    // getting otp
    otpManager.generate(signUppedUser.email)
    // generating jwt bearer token
    signUppedUser.bearerToken = jwt.sign({ user: signUppedUser._id, rank: signUppedUser.rank, email: signUppedUser.email }, process.env.PHS_JWT_SIGN_UP_SECRET_KEY, { expiresIn: "1 days" })
    // sending response
    return signUppedUser
}

// login
userLogic.logUser = async (user) => {
    // const loggedUser = await userModel.findOne({ email })
    const loggedInUserData = { ...user }
    // getting otp
    otpManager.generate(loggedInUserData.email)
    // generating jwt bearer token
    loggedInUserData.bearerToken = jwt.sign({ user: loggedInUserData._id, rank: loggedInUserData.rank, email: loggedInUserData.email }, process.env.PHS_JWT_USER_LOGGING_SECRET_KEY, { expiresIn: "1 days" })
    // sending response
    return loggedInUserData
}

// verifying OTP
userLogic.validateOTP = async (tokens, otp) => {
    const validationData = {}
    const decodedToken = jwt.verify(tokens.bearerToken, process.env.PHS_JWT_SIGN_UP_SECRET_KEY, (err, payload) => {
        if (err) {
            return jwt.verify(tokens.bearerToken, process.env.PHS_JWT_USER_LOGGING_SECRET_KEY)
        } else {
            if (payload.rank === "NEW") userModel.findByIdAndUpdate(payload.user, { rank: "MANGO" })
            return payload
        }
    })
    console.log(decodedToken, otp)
    const validOTP = await otpManager.verify(decodedToken.email, otp)
    validationData.bearerToken = validOTP ? jwt.sign({ user: decodedToken.user }, process.env.PHS_JWT_SIGN_IN_SECRET_KEY, { expiresIn: "1 days" }) : null
    const message = (validationData.bearerToken ) ? "Verification successful!" : "Verification failed!"
    return { data: validationData, message }
}

// get user profile 
userLogic.getUserProfile = async (userID) => {
    const foundUserOnDatabase = await userModel.findById(userID)
    const userDataOnDatabase = {...foundUserOnDatabase._doc}
    userDataOnDatabase.profilePic = await firebaseManager.fetchMedia(`${userDataOnDatabase._id}/${userDataOnDatabase.profilePic}`)
    // fetching user profile
    return userDataOnDatabase
}

module.exports = userLogic