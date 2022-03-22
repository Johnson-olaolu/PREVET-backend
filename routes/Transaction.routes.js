const express = require("express")
const router = express.Router()
const { confirmCredit }  = require('../controllers/Transaction.controller')

router.get("/confirm-credit", confirmCredit)

router.get("/debit", (req, res) => {
    
})

module.exports = router;