const Rating = require("../models/Rating")
const Recipe = require("../models/Recipe")

const recalculateRecipeRating = async (recipeId) => {
    const ratings = await Rating.find({ recipeId })
    const count = ratings.length
    const avg = count ? ratings.reduce((sum, r) => sum + r.rating, 0) / count : 0
    await Recipe.findByIdAndUpdate(recipeId, { rating: avg.toFixed(1), ratingCount: count })
}

// upsert: a user rating a recipe again updates their existing rating
const rateRecipe = async (req, res) => {
    try {
        const { rating } = req.body
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" })
        }

        const saved = await Rating.findOneAndUpdate(
            { recipeId: req.params.recipeId, userId: req.user.id },
            { rating },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        )

        await recalculateRecipeRating(req.params.recipeId)
        res.status(201).json(saved)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { rateRecipe }
