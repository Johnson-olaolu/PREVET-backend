const express = require('express')
const session = require('express-session')
const passport = require('passport')
const dotenv = require("dotenv").config()
const sequelize = require("sequelize")
const { notFound, errorHandler } = require('./middleware/ErrorMiddleware')
const initializePassport = require('./utils/passport-strategy')

//app midlleware
const app = express()
app.use(express.json())


//express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// initialize passport
initializePassport()

app.get("/", (req, res) => {
    res.send("Welcome to Prevet")
})

//routes
const appRoutes = require('./routes/index.routes')
app.use("/api", appRoutes)

// error handlng
app.use(notFound, errorHandler)

app.listen(process.env.PORT || 5000, function () {
    console.log(`App is running on ${process.env.PORT}`)
})