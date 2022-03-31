const express = require("express")
const { getAllUsers, getSingleUser, updateSingleUser, deleteSingleUser } = require("../controllers/User.controller")
const router = express.Router()

router.get("/", getAllUsers)
router.get("/:userId", getSingleUser)
router.put("/:userId", updateSingleUser)
router.delete("/:userId", deleteSingleUser)

module.exports = router