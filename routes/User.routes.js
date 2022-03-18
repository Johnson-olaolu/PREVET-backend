const express = require("express")
const { registerUser, loginUser, verifyToken } = require("../controllers/User.controller")
const router = express.Router()

router.get("/")
router.get("/:id")
router.put("/:id")
router.delete("/:id")
router.delete("/:id")
module.exports = router