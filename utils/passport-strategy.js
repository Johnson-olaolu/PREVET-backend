const LocalStrategy = require('passport-local').Strategy
const passport = require("passport")
const db = require('../models/index')
const bcrypt = require('bcryptjs')

const Op = db.Sequelize.Op
const initializePassport = () => {
    passport.use(new LocalStrategy({ usernameField: 'userName' }, function (username, password, done) {
        const user = db.User.findOne({
            where : {
                [Op.or] : [{userName : username}, {email : email}]
            }
        })
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if(user.verificationToken !== true) {
            return done(null, false)
        }
        if(await bcrypt.compareSync(password, user.password) === false) {
            return done(null, false)
        }
        return done (null, user)
    }));
}

// const authUser = (username, password, done) => {
//     db.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//     });
// }

// function authUser() {
//     
//   }


