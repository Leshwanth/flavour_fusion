const Favorite = require("../models/Favorite")
const User = require("../models/User")

const getMyFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.user.id }).populate("recipeId")
        res.json(favorites.map(f => f.recipeId))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const addFavorite = async (req, res) => {
    try {
        const { recipeId } = req.params
        const existing = await Favorite.findOne({ userId: req.user.id, recipeId })
        if (existing) return res.status(400).json({ message: "Already in favorites" })

        const fav = await Favorite.create({ userId: req.user.id, recipeId })
        await User.findByIdAndUpdate(req.user.id, { $addToSet: { favorites: recipeId } })
        res.status(201).json(fav)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const removeFavorite = async (req, res) => {
    try {
        const { recipeId } = req.params
        await Favorite.deleteOne({ userId: req.user.id, recipeId })
        await User.findByIdAndUpdate(req.user.id, { $pull: { favorites: recipeId } })
        res.json({ status: "ok" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getMyFavorites, addFavorite, removeFavorite }
