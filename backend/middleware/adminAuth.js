// Must run AFTER verifyToken, since it relies on req.user
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" })
    }
    next()
}

module.exports = isAdmin

// dandigamleshwanth_db_user
// xCHdhevjxQrYDXmG
