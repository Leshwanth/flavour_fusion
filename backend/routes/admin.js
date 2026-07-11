const express = require("express")
const router = express.Router()
const { getStats, getAllUsers, updateUserRole, deleteUser } = require("../controller/admin")
const { verifyToken } = require("../middleware/auth")
const isAdmin = require("../middleware/adminAuth")

router.use(verifyToken, isAdmin) // every route below requires an admin

router.get("/stats", getStats)
router.get("/users", getAllUsers)
router.put("/users/:id/role", updateUserRole)
router.delete("/users/:id", deleteUser)

module.exports = router
