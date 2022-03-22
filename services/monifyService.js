const dotenv = require("dotenv").config();
const axios = require("axios");

const getMonifyBearerToken = async () => {
	const AuthString = new Buffer.from(
		`${process.env.MONIFY_API_KEY}:${process.env.MONIFY_SECRET_KEY}`,
		"utf8"
	).toString("base64");
	const response = await axios.post(
		`${process.env.MONIFY_BASE_URL}/api/v1/auth/login`,
		{},
		{
			headers: {
				Authorization: `Basic ${AuthString}`,
			},
		}
	);
	return response.data.responseBody;
};

const createVirtualAccount = async (payload, accessToken) => {
	const response = await axios.post(s
		`${process.env.MONIFY_BASE_URL}/api/v2/bank-transfer/reserved-accounts`,
		payload,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	return response.data.responseBody;
};

const initiateTransaction = async (payload, accessToken) => {
	const response = await axios.post(
		`${process.env.MONIFY_BASE_URL}/api/v1/merchant/transactions/init-transaction`,
		payload,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	return response.data.responseBody;
};

const confirmTransaction = async (paymentReference, accessToken) => {
	 const response = await axios.get(
		 `${process.env.MONIFY_BASE_URL}/api/v2/transactions/${paymentReference}`, {
			 headers : {
				 Authorization : `Bearer ${accessToken}`
			 }
		 }
	 )
	 return response.data.responseBody
}

module.exports = {
	getMonifyBearerToken,
	createVirtualAccount,
	initiateTransaction,
	confirmTransaction
};
