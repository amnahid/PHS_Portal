const jwt = require('jsonwebtoken')
const userModel = require("../database/models/user.model");

// scaffolding
const authUtil = {}

// verify logged in user
authUtil.verifyJWT = (req, res, next) => {
    const authHeader = req.headers.bearertoken;
    if (!authHeader) {
        return res.status(401).send('unauthorized access');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.PHS_JWT_SIGN_IN_SECRET_KEY, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'forbidden access' })
        }
        req.decodedJWT = decoded;
        next();
    })

}

// verify admin or not
authUtil.verifyRank = async (req, res, next) => {
    const { user } = req.decodedJWT
    const userData = await userModel.findById(user)
    if (userData.rank === "ADMIN" || userData.rank === "MODERATOR") {
        req.userDataSet = userData
        req.moderationPower = true
        next()
    } else if (userData.rank === "MANGO") {
        req.userDataSet = userData
        req.moderationPower = false
        next()
    } else {
        return res.status(401).json({ message: 'unauthorized access. verify your email first' });
    }
}

module.exports = authUtil