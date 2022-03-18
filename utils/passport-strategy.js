const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const db = require("../models/index");
const bcrypt = require("bcryptjs");
const Validator = require("../validators/validators");

const Op = db.Sequelize.Op;
const initializePassport = () => {
	passport.use(
		"login",
		new LocalStrategy(
			{ usernameField: "userName", passwordField: "password" },
			async function (username, password, done) {
				// const {error} = await Validator.login.validateAsync({username, password})
				const user = await db.User.findOne({
					where: {
						[Op.or]: [{ userName: username }, { email: username }],
					},
				});
				if (!user) {
					return done(null, false, {message : "User Not Found"});
				}
				if (!user.verificationToken) {
					return done(null, false, {
						message: "Please confirm your email",
					});
				}
				if (!validatePassword(user.password, password)) {
					return done(null, false, {
						message: "Wrong Password",
					});
				}
				return done(null, user, { message: 'Logged in Successfully'});
			}
		)
	);
};

const validatePassword = async (userPassword, password) => {
	const passwordIsValid = await bcrypt.compareSync(password, userPassword);
	console.log(passwordIsValid)
	return passwordIsValid
};

module.exports = initializePassport;
