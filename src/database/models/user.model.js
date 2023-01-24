const mongoose = require('mongoose');

const objectID = mongoose.Schema.ObjectId

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: String,
    about: String,
    notifications: [String],
    media: [{
            reference: objectID,
            createdAt: {
                type: Date,
                default: Date.now(),
                immutable: true
            },
    }],
    posts: [objectID],
    followers: [objectID],
    followings: [objectID],
    profilePic: String, // ADMIN, MANGO, MODERATOR,
    rank: {
        type: String, // ADMIN, MANGO, MODERATOR
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('users', userSchema)