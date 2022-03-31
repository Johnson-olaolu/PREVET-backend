const dotenv = require("dotenv").config();
const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const bcrypt = require("bcryptjs")
const vetterValidator = require("../validators/vetterValidator");

const addVetter = asyncHandler(async (req, res) => {
	const { error } = await vetterValidator.addVetter.validateAsync(req.body);
	if (error) {
		res.status(400);
		throw new Error(error.message);
	}

	const { firstName, lastName, userName, password, phoneNum } = req.body;

	const newVetter = req.body;

	const role_id = await db.Role.findOne({ where: { name: "vetter" } });

	const pass = bcrypt.hashSync(password, 11);

	newVetter.firstName =
		firstName.charAt(0).toUpperCase() + firstName.slice(1);
	newVetter.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
	newVetter.userName = userName;
	newVetter.password = pass;
	newVetter.phoneNum = "+234" + phoneNum.slice(1);
	newVetter.role = role_id.id;
	newVetter.verificationToken = "vetter";
    newVetter.isVerified = true;

	const createdVetter = await db.User.create(newVetter);

	if (!createdVetter) {
		res.status(500);
		throw new Error("Could not create vetter");
	}

	res.status(200).json({
		success: true,
		data: createdVetter,
	});
});

module.exports = {
	addVetter,
};
