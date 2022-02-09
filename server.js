const express = require('express')
const dotenv = require("dotenv").config()
const app = express()

app.get("/", (req, res ) => {
    res.send("Welcome to Prevet")
})



app.listen(5000, function(){
    console.log("App is running")
})