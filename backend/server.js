const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const connectDb = require("./config/connectionDb")

const app = express()
const PORT = process.env.PORT || 3000

connectDb()

app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL || "*" }))
app.use(express.static("public"))

app.use("/", require("./routes/user"))
app.use("/recipe", require("./routes/recipe"))
app.use("/category", require("./routes/category"))
app.use("/comment", require("./routes/comment"))
app.use("/rating", require("./routes/rating"))
app.use("/favorite", require("./routes/favorite"))
app.use("/admin", require("./routes/admin"))

// basic error handler (e.g. multer file-type errors)
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(err.status || 500).json({ message: err.message || "Something went wrong" })
})

app.listen(PORT, () => {
    console.log(`app is listening on port http://localhost:${PORT}`)
})
