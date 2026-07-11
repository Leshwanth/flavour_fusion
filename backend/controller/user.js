const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )
}

const sanitize = (user) => {
    const obj = user.toObject ? user.toObject() : user
    delete obj.password
    return obj
}

const userSignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email and password are required" })
        }

        const existing = await User.findOne({ $or: [{ email }, { username }] })
        if (existing) {
            return res.status(400).json({ message: "Email or username already in use" })
        }

        const hashPwd = await bcrypt.hash(password, 10)
        const newUser = await User.create({ username, email, password: hashPwd })
        const token = signToken(newUser)

        return res.status(201).json({ token, user: sanitize(newUser) })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        const user = await User.findOne({ email })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = signToken(user)
        return res.status(200).json({ token, user: sanitize(user) })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate("favorites")
            .select("-password")
        if (!user) return res.status(404).json({ message: "User not found" })
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { username, bio } = req.body
        const updateData = { username, bio }
        if (req.file) updateData.profileImage = req.file.filename

        const updated = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select("-password")
        res.json(updated)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { userLogin, userSignUp, getUser, getMe, updateProfile }
