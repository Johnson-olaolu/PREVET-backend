const asyncHandler = require("express-async-handler");
const db = require("../models");
const walletValidator = require("../validators/walletValidators");
const walletService = require("../services/walletService");

const getSingleWallet = asyncHandler(async (req, res) => {
	const { error } = await walletValidator.getSingleWallet.validateAsync(
		req.params
	);
	if (error) {
		res.status(400);
		throw new Error(error.message);
	}
	const walletId = req.params.walletId;

	const wallet = await db.Wallet.findOne({ where: { id: walletId } });

	if (!wallet) {
		res.status(400);
		throw new Error(" Wallet not found");
	}

	res.status(200).json({
		success: true,
		data: wallet,
	});
});


const getAllWallets = asyncHandler(async (req, res) => {
	const wallets = await db.Wallet.findAll()
	res.status(200).json({
		success : true,
		data : wallets
	})
});

const initiateCreditWallet = asyncHandler(async (req, res) => {
	const { error } = await walletValidator.creditWallet.validateAsync(
		req.body
	);
	if (error) {
		res.status(400);
		throw new Error(error.message);
	}
	const { walletId, amount } = req.body;

	try {
		const redirectLink = await walletService.initiateMonifyCreditWallet(
			walletId,
			amount
		);

        res.json({
            success : true,
            data : redirectLink
        })
	} catch (error) {
		res.status(500)
        throw new Error(`Initiate transaction failed : ${error.message}`)
	}
	
});



const debitWallet = asyncHandler(async (req, res) => {});

module.exports = {
	getAllWallets,
	getSingleWallet,
	initiateCreditWallet,
	debitWallet,
};
