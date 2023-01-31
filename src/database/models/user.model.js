const mongoose = require('mongoose');

const objectID = mongoose.Schema.ObjectId

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
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
    profilePic: String,
    rank: {
        type: String, // ADMIN, MANGO, MODERATOR, NE
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