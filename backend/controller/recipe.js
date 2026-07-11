const Recipe = require("../models/Recipe")
const Category = require("../models/Category")

// GET /recipe  -> supports search, filters, sort (Recipes Listing + Search Results pages)
const getRecipes = async (req, res) => {
    try {
        const { q, category, difficulty, time, sort, limit, page } = req.query
        const filter = {}

        if (q) filter.$text = { $search: q }
        if (category && category !== "All") filter.category = category
        if (difficulty && difficulty !== "All") filter.difficulty = difficulty
        if (time) filter.preparationTime = { $lte: Number(time) }

        let sortOption = { createdAt: -1 } // Latest by default
        if (sort === "rating") sortOption = { rating: -1 }
        if (sort === "time") sortOption = { preparationTime: 1 }

        const pageNum = Number(page) || 1
        const limitNum = Number(limit) || 20

        const recipes = await Recipe.find(filter)
            .populate("category", "name")
            .populate("ownerId", "username profileImage")
            .sort(sortOption)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum)

        const total = await Recipe.countDocuments(filter)

        res.json({ recipes, total, page: pageNum, pages: Math.ceil(total / limitNum) })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate("category", "name")
            .populate("ownerId", "username profileImage bio")
        if (!recipe) return res.status(404).json({ message: "Recipe not found" })
        res.json(recipe)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const addRecipe = async (req, res) => {
    try {
        const { title, description, category, cuisine, difficulty, preparationTime,
            cookingTime, servings, ingredients, instructions, tags } = req.body

        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ message: "Title, ingredients and instructions are required" })
        }

        const newRecipe = await Recipe.create({
            title,
            description,
            category,
            cuisine,
            difficulty,
            preparationTime,
            cookingTime,
            servings,
            ingredients: Array.isArray(ingredients) ? ingredients : ingredients.split(",").map(i => i.trim()),
            instructions: Array.isArray(instructions) ? instructions : instructions.split("\n").filter(Boolean),
            tags: tags ? (Array.isArray(tags) ? tags : tags.split(",").map(t => t.trim())) : [],
            coverImage: req.file ? req.file.filename : "",
            ownerId: req.user.id
        })

        if (category) {
            await Category.findByIdAndUpdate(category, { $inc: { recipeCount: 1 } })
        }

        res.status(201).json(newRecipe)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const editRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
        if (!recipe) return res.status(404).json({ message: "Recipe not found" })

        if (String(recipe.ownerId) !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to edit this recipe" })
        }

        const updateData = { ...req.body }
        if (req.file) updateData.coverImage = req.file.filename

        const updated = await Recipe.findByIdAndUpdate(req.params.id, updateData, { new: true })
        res.json(updated)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
        if (!recipe) return res.status(404).json({ message: "Recipe not found" })

        if (String(recipe.ownerId) !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to delete this recipe" })
        }

        await Recipe.deleteOne({ _id: req.params.id })
        res.json({ status: "ok" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// GET /recipe/user/:userId -> "My Recipes" tab on Profile page
const getRecipesByUser = async (req, res) => {
    try {
        const recipes = await Recipe.find({ ownerId: req.params.userId }).sort({ createdAt: -1 })
        res.json(recipes)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, getRecipesByUser }
