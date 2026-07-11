const express = require("express")
const router = express.Router()
const { getCommentsForRecipe, addComment, deleteComment } = require("../controller/comment")
const { verifyToken } = require("../middleware/auth")

router.get("/:recipeId", getCommentsForRecipe)
router.post("/:recipeId", verifyToken, addComment)
router.delete("/:id", verifyToken, deleteComment)

module.exports = router
