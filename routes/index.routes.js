const express = require("express")
const router = express.Router()

//Authentication Handler
const isAuthenticated = require('../middleware/AuthMiddleware')

// import Routes
const userRoutes = require("./User.routes")
const authRoutes = require("./Auth.routes")
const transactionRoutes = require("./Transaction.routes")
const walletRoutes = require("./Wallet.routes")
const vetterRoutes = require("./Vetter.routes")

// routes
router.use("/auth", authRoutes)
router.use("/transaction" , transactionRoutes)
router.use("/user" , isAuthenticated , userRoutes)
router.use("/wallet", isAuthenticated, walletRoutes)
router.use("/vetter", isAuthenticated, vetterRoutes)

module.exports = router