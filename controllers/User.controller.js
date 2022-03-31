const dotenv = require("dotenv").config();
const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const userValidator = require("../validators/userValidators");

const getAllUsers = asyncHandler(async (req, res) => {
	const users = await db.User.findAll();
	res.json({ success: true, data: users });
});

const getSingleUser = asyncHandler(async (req, res) => {
	console.log(req.params.userId);
	const { error } = await userValidator.getSingleUser.validateAsync(req.params);

	if (error) {
		res.status(400);
		throw new Error(error.message);
	}
	const userId = req.params.userId;
	const user = await db.User.findOne({ where: { id: userId } });

	if (!user) {
		res.status(400);
		throw new Error("User not found");
	}

	res.json({ success: true, data: user });
});

const updateSingleUser = asyncHandler(async (req, res) => {
	const { error } = await userValidator.updateSingleUser.validateAsync(req.body);

	if (error) {
		res.status(400);
		throw new Error(error.message);
	}
	const userId = req.params.userId;
	const body = req.body;

	const user = await db.User.findOne({ where: { id: userId } });

	if (!user) {
		res.status(400);
		throw new Error("User not found");
	}

	let data = {};
	for (let field in body) {
		if (field == "firstName") {
			data.firstName =
				body.firstName.charAt(0).toUpperCase() +
				body.firstName.slice(1);
		} else if (field == "lastname") {
			data.lastName =
				body.lastName.charAt(0).toUpperCase() + body.lastName.slice(1);
		} else {
			data[field] = body[field];
		}
	}

   await user.update(data)

   res.status(201).json({
       success : true,
       message : "User updated successfully"
   })
});

const deleteSingleUser = asyncHandler(async (req, res) => {
    const {error}  = await userValidator.deleteSingleUser.validateAsync(req.params)

    if(error) {
        res.status(400)
        throw  new Error(error.message)
    }

    const userId = req.params.userId

    const user = await db.User.findOne({where : {id: userId}})

    if(!user) {
        res.status(400)
        throw new Error("User not found")
    }

    await user.destroy()

    res.status(200).json({
        success : true,
        message : "User deleted successfully+"
    })
});



module.exports = {
	getSingleUser,
	getAllUsers,
	updateSingleUser,
	deleteSingleUser,
};
