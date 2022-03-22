const asyncHandler = require("express-async-handler");
const walletService = require("../services/walletService");
const walletValidator = require("../validators/walletValidators");

const confirmCredit = asyncHandler(async (req, res) => {
	const { error } = await walletValidator.confirmCredit.validateAsync(
		req.query
	);

	if (error) {
		res.status(400);
		throw new Error(error.message);
	}

	const paymentReference = req.query.paymentReference;

	const response = await  walletService.confirmMonifyCreditWallet(paymentReference);
	console.log(response)
});

module.exports = {
	confirmCredit,
};
