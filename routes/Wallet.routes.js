const express = require('express')
const router = express.Router()
const { getSingleWallet, debitWallet, getAllWallets, initiateCreditWallet } = require('../controllers/Wallet.controller')

router.get("/", getAllWallets)
router.get("/:walletId",  getSingleWallet)
router.post("/initiate-credit", initiateCreditWallet)
router.post("/debit", debitWallet)

module.exports = router