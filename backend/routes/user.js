const express = require("express")
const router = express.Router()
const { userLogin, userSignUp, getUser, getMe, updateProfile } = require("../controller/user")
const { verifyToken } = require("../middleware/auth")
const upload = require("../middleware/upload")

router.post("/signup", userSignUp)
router.post("/login", userLogin)
router.get("/user/me", verifyToken, getMe)
router.get("/user/:id", getUser)
router.put("/user/me", verifyToken, upload.single("profileImage"), updateProfile)

module.exports = router
