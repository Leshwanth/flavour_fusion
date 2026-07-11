const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model("Comment", commentSchema)
