const userModel = require("../database/models/user.model")

// scaffolding
const userLogic = {}

userLogic.signup = async (userData, res, next) => {
    try{
        const signedInUser = await userModel.insertMany(userData)
        res.status(201).json({
            data: signedInUser,
            message: "Signup successful!"
        })
    } catch (err) {
        next(err)
    }
}

module.exports = userLogic