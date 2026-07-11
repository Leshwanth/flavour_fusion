const express = require("express")
const router = express.Router()
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, getRecipesByUser } = require("../controller/recipe")
const { verifyToken } = require("../middleware/auth")
const upload = require("../middleware/upload")

router.get("/", getRecipes)                    // list + search + filters
router.get("/user/:userId", getRecipesByUser)   // Profile "My Recipes" tab
router.get("/:id", getRecipe)
router.post("/", verifyToken, upload.single("coverImage"), addRecipe)     // auth BEFORE upload
router.put("/:id", verifyToken, upload.single("coverImage"), editRecipe)
router.delete("/:id", verifyToken, deleteRecipe)

module.exports = router
