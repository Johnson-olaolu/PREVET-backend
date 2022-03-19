const dotenv = require("dotenv").config();
const axios = require("axios");
const { encodeBase64 } = require("bcryptjs");

const getMonifyBearerToken = async () => {
	const AuthString = new Buffer.from(
		`${process.env.MONIFY_API_KEY}:${process.env.MONIFY_SECRET_KEY}`,
		"utf8"
	).toString("base64");
	try {
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
	} catch (error) {
		console.log(error);
	}
};

const createVirtualAccount = async (payload, accessToken) => {
	try {
		const response = await axios.post(
			`${process.env.MONIFY_BASE_URL}/api/v2/bank-transfer/reserved-accounts`,
			payload,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
        return response.data.responseBody
	} catch (error) {
        console.log(error)
    }
};

module.exports = {
	getMonifyBearerToken,
    createVirtualAccount
};
