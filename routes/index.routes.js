const express = require("express")
const router = express.Router()

// import Routes
const userRoutes = require("./User.routes")
const authRoutes = require("./Auth.routes")

// routes
router.use("/user" , userRoutes)
router.use("/auth", authRoutes)

module.exports = router