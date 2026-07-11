const express = require("express")
const router = express.Router()
const { rateRecipe } = require("../controller/rating")
const { verifyToken } = require("../middleware/auth")

router.post("/:recipeId", verifyToken, rateRecipe)

module.exports = router
