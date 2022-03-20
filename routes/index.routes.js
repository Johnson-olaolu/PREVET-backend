const express = require("express")
const router = express.Router()

//Authentication Handler
const isAuthenticated = require('../middleware/AuthMiddleware')

// import Routes
const userRoutes = require("./User.routes")
const authRoutes = require("./Auth.routes")
const transactionRoutes = require("./Transaction.routes")
const walletRoutes = require("./Wallet.routes")

// routes
router.use("/auth", authRoutes)
router.use("/transaction" , transactionRoutes)
router.use("/user" , isAuthenticated , userRoutes)
router.use("/wallet", isAuthenticated, walletRoutes)

module.exports = router