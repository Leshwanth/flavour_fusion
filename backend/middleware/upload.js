const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images")
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const filename = Date.now() + "-" + file.fieldname + ext
        cb(null, filename)
    }
})

const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (allowed.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Only image files are allowed"), false)
    }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } })

module.exports = upload
