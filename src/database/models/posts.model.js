const mongoose = require('mongoose');

const objectID = mongoose.Schema.ObjectId

const postSchema = new mongoose.Schema({
    author: {
        type: objectID,
        require: true
    },
    media: [{
        type: String,
        require: true
    }],
    caption: {
        type: String,
        required: true
    },
    likes: [objectID],
    comments: [{
        author: objectID,
        createdAt: {
            type: Date,
            default: Date.now(),
            immutable: true
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        },
        comment: String,
        repliedTo: objectID
    }],
    sharedBy: [objectID],
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        require: true
    } // PUBLIC, REVIEW
})

module.exports = mongoose.model('posts', postSchema)