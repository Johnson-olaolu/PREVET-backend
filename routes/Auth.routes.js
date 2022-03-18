const express = require("express");
const router = express.Router();

const {
	registerUser,
	loginUser,
	verifyToken,
	getVerificationToken,
	resetPassword,
	getResetPasswordLink,
} = require("../controllers/Auth.controller");

router.post("/register", registerUser);
router.get("/verify-user", getVerificationToken);
router.post("/verify-user", verifyToken);
router.post("/login", loginUser);
router.get("/reset-password", getResetPasswordLink);
router.post("/reset-password", resetPassword);
module.exports = router;
