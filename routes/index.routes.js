const express = require("express")
const router = express.Router()

// import Routes
const userRoutes = require("./User.routes")


// routes
router.use("/user" , userRoutes)


module.exports = router