const mongoose = require("mongoose")

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    cuisine: {
        type: String,
        default: ""
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Easy"
    },
    preparationTime: {
        type: Number, // in minutes
        default: 0
    },
    cookingTime: {
        type: Number, // in minutes
        default: 0
    },
    servings: {
        type: Number,
        default: 1
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: [String],
        required: true
    },
    coverImage: {
        type: String,
        default: ""
    },
    nutrition: {
        calories: { type: Number, default: 0 },
        protein: { type: Number, default: 0 },
        carbs: { type: Number, default: 0 },
        fat: { type: Number, default: 0 }
    },
    rating: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        default: []
    }
}, { timestamps: true })

recipeSchema.index({ title: "text", cuisine: "text", tags: "text" })

module.exports = mongoose.model("Recipe", recipeSchema)
