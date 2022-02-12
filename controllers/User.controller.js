const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const otpGenerator = require("otp-generator")
const db = require("../models/index")
const sendEmail = require('../services/emailService')
const RegistrationMail = require('../templates/email/registrationMail')



const registerUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, userName, email, password, phoneNum, address } = req.body
	const newUser = { ...req.body };
	const role_id = await db.Role.findOne({ where: { name: 'customer' } })
	if (!role_id) {
		res.status(400)
		throw new Error({ success: false, message: "Unable to complete registration, Role not accepted" })
	}

	const pass = bcrypt.hashSync(password, 11);
	const verificationToken = otpGenerator.generate(5, {
		digits: true,
		alphabets: false,
		specialChars: false,
		upperCase: false,
	});

	newUser.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
	newUser.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
	newUser.userName = userName
	newUser.password = pass;
	newUser.phoneNum = "+234" + phoneNum.slice(1);
	newUser.role = role_id.id
	newUser.address =address
	newUser.verificationToken =verificationToken
	console.log(newUser)
	//create User
	const createdUser = await db.User.create(newUser)

	if (!createdUser) {
		res.status(200)
		throw new Error({success: false, message : "could not create User"})
	}
	sendEmail(new RegistrationMail(createdUser.email,createdUser ,createdUser.verificationToken))
	
	res.status(200).send({
		success: true,
		message:
		  `An OTP has been sent to ${createdUser.email}, use it to verify your account`,
	  });
})

module.exports = { registerUser}