const express = require('express')
const session = require('express-session')
const dotenv = require("dotenv").config()
const sequelize = require("sequelize")
const { notFound, errorHandler } = require('./middleware/ErrorMiddleware')

//app midlleware
const app = express()
app.use(express.json())

//express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))


app.get("/", (req, res) => {
    res.send("Welcome to Prevet")
})

//routes
const appRoutes = require('./routes/index.routes')
app.use("/api", appRoutes)

// error handlng
app.use(notFound, errorHandler)

app.listen(5000, function () {
    console.log("App is running")
})