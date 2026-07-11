const Category = require("../models/Category")

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 })
        res.json(categories)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        if (!name) return res.status(400).json({ message: "Name is required" })

        const category = await Category.create({
            name,
            description,
            image: req.file ? req.file.filename : ""
        })
        res.status(201).json(category)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const editCategory = async (req, res) => {
    try {
        const updateData = { ...req.body }
        if (req.file) updateData.image = req.file.filename
        const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true })
        res.json(updated)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteCategory = async (req, res) => {
    try {
        await Category.deleteOne({ _id: req.params.id })
        res.json({ status: "ok" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getCategories, addCategory, editCategory, deleteCategory }
