const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const otpGenerator = require("otp-generator");
const passport = require("passport");
const db = require("../models/index");
const sendEmail = require("../services/emailService");
const RegistrationMail = require("../templates/email/registrationMail");
const VerificationTokenMail = require("../templates/email/verificationTokenMail") 
const authValidator = require("../validators/authValidators");
const jwt = require("jsonwebtoken");
const passwordResetMail = require("../templates/email/passwordResetMail");
const moment = require("moment");
const WalletService = require('../services/walletService')

const registerUser = asyncHandler(async (req, res) => {
	const { error } = await authValidator.register.validateAsync(req.body); //validate request
	if (error) {
		res.status(400);
		throw new Error(error.message);
	}
	const {
		firstName,
		lastName,
		userName,
		email,
		password,
		phoneNum,
		address,
	} = req.body;
	const newUser = { ...req.body };
	const role_id = await db.Role.findOne({ where: { name: "customer" } });
	if (!role_id) {
		res.status(400);
		throw new Error("Unable to complete registration, Role not accepted");
	}

	const pass = bcrypt.hashSync(password, 11);
	const verificationToken = otpGenerator.generate(5, {
		digits: true,
		lowerCaseAlphabets: false,
		specialChars: false,
		upperCaseAlphabets: false,
	});

	newUser.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
	newUser.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
	newUser.userName = userName;
	newUser.password = pass;
	newUser.phoneNum = "+234" + phoneNum.slice(1);
	newUser.role = role_id.id;
	newUser.address = address;
	newUser.verificationToken = verificationToken;

	const expire = moment().add(15, "minutes").format("YYYY-MM-DD hh:mm:ss");



	await sendEmail(
		new RegistrationMail(newUser.email, newUser, newUser.verificationToken)
	);
	const createdUser = await db.User.create(newUser);

	
	if (!createdUser) {
		res.status(500);
		throw new Error("could not create User");
	}
	await createdUser.update({tokenExpiresIn : expire})

	res.status(201).send({
		success: true,
		message: `An OTP has been sent to ${createdUser.email}, use it to verify your account`,
	});
});

const getVerificationToken = asyncHandler(async (req, res) => {
	const { error } = await authValidator.getVerificationToken.validateAsync(
		req.query
	);
	if (error) {
		res.status(400);
		throw new Error(error.message);
	}
	const userId = req.query.userId;
	const user = await db.User.findOne({ where: { id: userId } });

	if (!user) {
		res.status(400);
		throw new Error("User does  not exist");
	}

	const verificationToken = otpGenerator.generate(5, {
		digits: true,
		lowerCaseAlphabets: false,
		specialChars: false,
		upperCaseAlphabets: false,
	});
	const expire = moment().add(15, "minutes").format("YYYY-MM-DD hh:mm:ss");

	await sendEmail(new VerificationTokenMail(user.email, user, verificationToken));

	await user.update({ verificationToken: verificationToken , tokenExpiresIn : expire });

	res.status(200).json({
		success: true,
		message: " New token has been sent to email",
	});
});

const verifyToken = asyncHandler(async (req, res) => {
	const { error } = await authValidator.verifyToken.validateAsync(req.body);
	if (error) {
		res.status(400);
		throw new Error(error.message);
	}
	const { email, token } = req.body;
	const currentTime = new Date().getTime()
	const user = await db.User.findOne({ where: { email: email } });
	if (!user) {
		res.status(400);
		throw new Error("User does not exist");
	}

	const tokenExpiresIn = new Date(user.tokenExpiresIn).getTime()

	if (currentTime > tokenExpiresIn) {
		res.status(401);
		throw new Error("Token has Expired");
	}

	if (user.verificationToken == token) {
		if(user.isVerified != false) {
			res.status(401)
			throw new Error("User already verified")
		}
		await user.update({ isVerified: true});
	} else {
		res.status(401);
		throw new Error("Invalid token");
	}

	try {
		await WalletService.createNewWallet(user)
	} catch (error) {
		console.log(error);
		throw new Error("could not create wallet")
	}
	res.status(200).send({
		success: true,
		message: "user successfully verified",
	});
});

const loginUser = asyncHandler(async (req, res, next) => {
	passport.authenticate("login", async (err, user, info) => {
		try {
			if (err || !user) {
				const error = new Error(info.message);
				return next(error);
			}
			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);
				const body = { id: user.id, email: user.email };
				const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
				return res.json({
					message: "User Logged in successfully",
					token: token,
					user: user,
				});
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

const getResetPasswordLink = asyncHandler(async (req, res) => {
	const { error } = await authValidator.getChangePasswordLink.validateAsync(req.query);
	if (error) {
		res.status(400);
		throw new Error(error.message);
	}
	const userId = req.query.userId;

	const user = await db.User.findOne({ where: { id: userId } });

	if (!user) {
		res.status(400);
		throw new Error("User not found");
	}

	const passwordResetToken = otpGenerator.generate(5, {
		digits: true,
		lowerCaseAlphabets: false,
		specialChars: false,
		upperCaseAlphabets: false,
	});

	const expire = moment().add(15, "minutes").format("YYYY-MM-DD hh:mm:ss");
	console.log(expire)
	const link = `${process.env.CLIENT_URL}/auth/reset-password/?userId=${user.id}&accessToken=${passwordResetToken}`;

	await sendEmail(new passwordResetMail(user.email, user, link));

	await user.update({ passwordResetToken: passwordResetToken , tokenExpiresIn : expire });

	res.status(200).send({
		success: true,
		message: `Password reset link sent to ${user.email}`,
	});
});


const resetPassword = asyncHandler(async (req, res) => {
	const {error} = await authValidator.resetPassword.validateAsync(req.body)

	if(error) {
		res.status(400)
		throw new Error(error.message)
	}
	const { userId, token, password} = req.body
	const currentTime = new Date().getTime()

	const user = await db.User.findOne({ where : {id : userId}})

	if(!user) {
		res.status(400)
		throw new Error(" User not found")
	}

	const tokenExpiresIn = new Date(user.tokenExpiresIn).getTime()
	if (currentTime > tokenExpiresIn) {
		res.status(401);
		throw new Error("Token has Expired");
	}

	if (token != user.passwordResetToken) {
		res.status(401)
		throw new Error(" token not valid")
	}

	await user.update({ password  : password})

	res.status(201).json({
		success : true,
		message : "Password changed successfully"
	})
});

module.exports = {
	registerUser,
	getVerificationToken,
	verifyToken,
	loginUser,
	getResetPasswordLink,
	resetPassword
};
