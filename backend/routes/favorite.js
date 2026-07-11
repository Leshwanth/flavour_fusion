const express = require("express")
const router = express.Router()
const { getMyFavorites, addFavorite, removeFavorite } = require("../controller/favorite")
const { verifyToken } = require("../middleware/auth")

router.get("/", verifyToken, getMyFavorites)
router.post("/:recipeId", verifyToken, addFavorite)
router.delete("/:recipeId", verifyToken, removeFavorite)

module.exports = router
