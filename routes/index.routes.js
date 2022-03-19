const express = require("express")
const router = express.Router()

//Authentication Handler
const isAuthenticated = require('../middleware/AuthMiddleware')

// import Routes
const userRoutes = require("./User.routes")
const authRoutes = require("./Auth.routes")
const testRoutes = require("./Test.routes")


// routes
router.use("/auth", authRoutes)
router.use("/test" , testRoutes)
router.use("/user" , isAuthenticated , userRoutes)


module.exports = router