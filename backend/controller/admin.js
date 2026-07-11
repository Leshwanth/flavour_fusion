const User = require("../models/User")
const Recipe = require("../models/Recipe")
const Category = require("../models/Category")
const Comment = require("../models/Comment")

// GET /admin/stats -> powers the Admin Dashboard cards + "Top Recipes"
const getStats = async (req, res) => {
    try {
        const [totalUsers, totalRecipes, totalCategories, totalComments] = await Promise.all([
            User.countDocuments(),
            Recipe.countDocuments(),
            Category.countDocuments(),
            Comment.countDocuments()
        ])

        const topRecipes = await Recipe.find().sort({ rating: -1 }).limit(5).select("title rating")

        res.json({ totalUsers, totalRecipes, totalCategories, totalComments, topRecipes })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 })
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body
        const updated = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password")
        res.json(updated)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.json({ status: "ok" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getStats, getAllUsers, updateUserRole, deleteUser }
