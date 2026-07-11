const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }]
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)
