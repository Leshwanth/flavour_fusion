const Comment = require("../models/Comment")

const getCommentsForRecipe = async (req, res) => {
    try {
        const comments = await Comment.find({ recipeId: req.params.recipeId })
            .populate("userId", "username profileImage")
            .sort({ createdAt: -1 })
        res.json(comments)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const addComment = async (req, res) => {
    try {
        const { comment, parentComment } = req.body
        if (!comment) return res.status(400).json({ message: "Comment text is required" })

        const newComment = await Comment.create({
            recipeId: req.params.recipeId,
            userId: req.user.id,
            comment,
            parentComment: parentComment || null
        })
        const populated = await newComment.populate("userId", "username profileImage")
        res.status(201).json(populated)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) return res.status(404).json({ message: "Comment not found" })

        if (String(comment.userId) !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" })
        }

        await Comment.deleteOne({ _id: req.params.id })
        res.json({ status: "ok" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getCommentsForRecipe, addComment, deleteComment }
