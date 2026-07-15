const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" })
    }

    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "No token provided" })
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: "Invalid or expired token" })
        }
        req.user = decoded
        next() // only called once verification actually succeeds
    })
}

// optional auth: attaches req.user if a valid token is present, but doesn't block the request
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader) return next()

    const token = authHeader.split(" ")[1]
    if (!token) return next()

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (!err) req.user = decoded
        next()
    })
}

module.exports = { verifyToken, optionalAuth }
