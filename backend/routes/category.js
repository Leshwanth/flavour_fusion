const express = require("express")
const router = express.Router()
const { getCategories, addCategory, editCategory, deleteCategory } = require("../controller/category")
const { verifyToken } = require("../middleware/auth")
const isAdmin = require("../middleware/adminAuth")
const upload = require("../middleware/upload")

router.get("/", getCategories)
router.post("/", verifyToken, isAdmin, upload.single("image"), addCategory)
router.put("/:id", verifyToken, isAdmin, upload.single("image"), editCategory)
router.delete("/:id", verifyToken, isAdmin, deleteCategory)

module.exports = router
