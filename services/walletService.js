const dotenv = require("dotenv").config();
const uniqid = require("uniqid");
const db = require("../models/index");
const moment = require("moment");
const { transactionStatus, transactionType, transactionConfirmedStatus } = require("../utils/constants.js");
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

	const transaction = await db.Transaction.create({
		walletId: wallet.id,
		userId: user.id,
		status: transactionStatus.STARTED,
	});

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
		redirectUrl: `${process.env.REDIRECT_URL}/transaction/confirm-credit`,
		paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
	};

	const monifyTransaction = await MonifyService.initiateTransaction(
		payload,
		accessToken
	);

	await transaction.update({
		status: transactionStatus.INPROGRESS,
		transactionReference: monifyTransaction.transactionReference,
		paymentReference: monifyTransaction.paymentReference,
	});

	return monifyTransaction.checkoutUrl;
};

const confirmMonifyCreditWallet = async (paymentReference) => {
	const activeTransaction = await db.Transaction.findOne({
		where: { paymentReference: paymentReference },
	});

	if (!activeTransaction) {
		throw new Error(" transaction does not exist");
	}

	const activeWallet = await db.Wallet.findOne({
		where: { id: activeTransaction.walletId },
	});
	const activeUser = await db.User.findOne({
		where: { id: activeTransaction.userId },
	});

	let encodedtransactionReference = encodeURI(
		activeTransaction.transactionReference
	);

	const { accessToken } = await MonifyService.getMonifyBearerToken();

	const confirmedMonifyTransaction = await MonifyService.confirmTransaction(
		encodedtransactionReference,
		accessToken
	);

	let transactionData = {};
	for (let field in confirmedMonifyTransaction) {
		if (
			field == "cardDetails" ||
			field == "product" ||
			field == "customer" ||
			field == "metaData" ||
			field == "accountPayments" ||
			field == "accountDetails"
		) {
			transactionData[field] = JSON.stringify(
				confirmedMonifyTransaction[field]
			);
		}else {
			transactionData[field] = confirmedMonifyTransaction[field];
		transactionData["status"] = transactionStatus.COMPLETED
		}
	}

	await activeTransaction.update(transactionData)

	await db.WalletTransaction.create({
		transactionType : transactionType.CREDIT,
		walletId : activeWallet.id,
		prevBalance : activeWallet.balance,
		currBalance : activeWallet.balance + activeTransaction.amountPaid,
		confirmed : transactionConfirmedStatus.CONFIRMED,
		reference : activeTransaction.paymentReference,
		userId : activeUser.id
	})

	await activeWallet.update({
		balance : activeWallet.balance + activeTransaction.amountPaid,
		ledgerBalance : activeWallet.ledgerBalance + activeTransaction.amountPaid
	})
	
	return activeTransaction.status
};

module.exports = {
	createNewWallet,
	initiateMonifyCreditWallet,
	confirmMonifyCreditWallet,
};
