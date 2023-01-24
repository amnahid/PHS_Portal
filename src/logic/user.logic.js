const userModel = require("../database/models/user.model")
const mail = require("../utils/mail.util")
const otpManager = require("../utils/otp.util")

// scaffolding
const userLogic = {}

userLogic.signup = async (userData, res, next) => {
    try{
        const signedInUser = await userModel.insertMany(userData)
        // getting otp
        const otp = await otpManager.generate(signedInUser[0].email)
        // sending otp to user
        await mail(signedInUser[0].email, `Your OTP code is: ${otp}`, "PHS Portal OTP CODE")
        res.status(201).json({
            data: signedInUser[0],
            message: "Signup successful!"
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = userLogic