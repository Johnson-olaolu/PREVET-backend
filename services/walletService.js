const dotenv = require("dotenv").config();
const uniqid = require("uniqid");
const db = require("../models/index");
const moment = require("moment");
const MonifyService = require("./monifyService");

const createNewWallet = async (user) => {
	const { accessToken } = await MonifyService.getMonifyBearerToken();

	const payload = {
		accountReference: user.userName,
		accountName: `${user.firstName} ${user.lastName}`,
		currencyCode: "NGN",
		contractCode: process.env.MONIFY_CONTACT_CODE,
		customerEmail: user.email,
		customerName: `${user.firstName} ${user.lastName}`,
		getAllAvailableBanks: false,
		preferredBanks: ["035"],
	};

	const virtualAcctDetails = await MonifyService.createVirtualAccount(
		payload,
		accessToken
	);

	const newWallet = {
		userEmail: user.email,
		userId: user.id,
		virtualAcctNo: virtualAcctDetails.accounts[0].accountNumber,
		virtualAcctName: virtualAcctDetails.customerName,
		virtualAcctBankName: virtualAcctDetails.accounts[0].bankName,
	};

	const wallet = await db.Wallet.create(newWallet);
};

const initiateMonifyCreditWallet = async (walletId, amount) => {
	const { accessToken } = await MonifyService.getMonifyBearerToken();

	const wallet = await db.Wallet.findOne({ where: { id: walletId } });

	const user = await db.User.findOne({ where: { id: wallet.userId } });
	
	const presentDate = moment().format("YYYYMMDD");
	const paymentReference = uniqid(`${user.userName}-`, `-${presentDate}`);

	const payload = {
		amount: amount,
		customerName: `${user.firstName} ${user.lastName}`,
		customerEmail: user.email,
		paymentReference: paymentReference,
		paymentDescription: "Credit Prevet Wallet",
		currencyCode: "NGN",
		contractCode: process.env.MONIFY_CONTACT_CODE,
		redirectUrl: `${process.env.REDIRECT_URL}/payment/confirm`,
		paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
	};

	const monifyTransaction = await MonifyService.initiateTransaction(
		payload,
		accessToken
	);

	await db.Transaction.create({
		walletId: wallet.id,
		userId: user.id,
		transactionReference: monifyTransaction.paymentReference,
	});

	return monifyTransaction.checkoutUrl;
};

const confirmMonifyCreditWallet = async () => {};

module.exports = {
	createNewWallet,
	initiateMonifyCreditWallet,
	confirmMonifyCreditWallet,
};
