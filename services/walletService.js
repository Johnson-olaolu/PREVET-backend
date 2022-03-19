
const dotenv = require('dotenv').config()
const db = require('../models/index')
const MonifyService = require("./monifyService");


const createNewWallet = async (user) => {
	const { accessToken } = await MonifyService.getMonifyBearerToken();

    const payload = {
        "accountReference": user.userName,
        "accountName": `${user.firstName} ${user.lastName}`,
        "currencyCode": "NGN",
        "contractCode": process.env.MONIFY_CONTACT_CODE,
        "customerEmail": user.email,
        "customerName": `${user.firstName} ${user.lastName}`,
        "getAllAvailableBanks": false,
        "preferredBanks": ["035"]
    }

    const virtualAcctDetails = await MonifyService.createVirtualAccount(payload, accessToken)

    const newWallet = {
        userEmail : user.email,
        userId : user.id,
        virtualAcctNo : virtualAcctDetails.accounts[0].accountNumber,
        virtualAcctName : virtualAcctDetails.customerName,
        virtualAcctBankName : virtualAcctDetails.accounts[0].bankName
    }

    const wallet = await db.Wallet.create(newWallet)
};

module.exports = {
	createNewWallet,
};
