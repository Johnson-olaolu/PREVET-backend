const Mailgen = require("mailgen");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config()
const smtpTransport = require("nodemailer-smtp-transport");
const RegistrationMail = require("../templates/email/registrationMail");


let transporter = nodemailer.createTransport(smtpTransport({
	host: "sxb1plzcpnl489892.prod.sxb1.secureserver.net",
	port: 465,
	secure: true,
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
			from: `"Prevet" ${process.env.MAIL_USER}`,
			to: mailOptions.email,
			subject: mailOptions.subject || "No Subject",
			text: text,
			html: body,
		},
		function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent: " + info.response);
			}
		}
	);
};

module.exports = sendEmail;
