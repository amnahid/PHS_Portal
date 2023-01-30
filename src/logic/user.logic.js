const jwt = require('jsonwebtoken');


const userModel = require("../database/models/user.model")
const otpManager = require("../utils/otp.util")

// scaffolding
const userLogic = {}

userLogic.addNewUser = async (userData, res, next) => {
    try{
        const signedUser = await userModel.insertMany(userData)
        const signUppedUser = {...signedUser[0]._doc}
        // getting otp
        await otpManager.generate(signUppedUser.email)
        // generating jwt token
        signUppedUser.token = jwt.sign({user: signUppedUser._id, rank: signUppedUser.rank},process.env.PHS_JWT_SECRET_KEY,  {expiresIn: "1 days"})
        // sending response
        res.status(201).json({
            data: signUppedUser,
            message: "Signup successful!"
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = userLogic