const mongoose = require("mongoose")

const ratingSchema = mongoose.Schema({
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
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, { timestamps: true })

// one rating per user per recipe
ratingSchema.index({ recipeId: 1, userId: 1 }, { unique: true })

module.exports = mongoose.model("Rating", ratingSchema)
