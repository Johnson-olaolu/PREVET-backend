const Mailgen = require("mailgen");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config()
const smtpTransport = require("nodemailer-smtp-transport");
const RegistrationMail = require("../templates/email/registrationMail");


let transporter = nodemailer.createTransport(smtpTransport({
	host: "smtp.ethereal.email",
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD
	}
}));

const sendEmail = (mailOptions) => {
	const mailGenerator = new Mailgen({
		theme: "default",
		product: {
			name: "PREVET",
			link: "https://prevet.io",
			//logo: "",
		},
	});

	const body = mailGenerator.generate(mailOptions.setBody());
	const text = mailGenerator.generatePlaintext(mailOptions.setBody());

	transporter.sendMail(
		{
			from: `"Prevet" ${process.env.EMAIL_USER}`,
			to: mailOptions.email,
			subject: mailOptions.subject || "No Subject",
			text: text,
			html: body,
		},
		function (error, info) {
			if (error) {
				res.status(500)
				throw new Error({success : false, message : "Email not sent"})
			} else {
				console.log("Email sent: " + info.response);
			}
		}
	);
};

module.exports = sendEmail;
