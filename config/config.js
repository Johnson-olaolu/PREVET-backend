const dotenv = require("dotenv").config()
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME
const host = process.env.DB_HOST
const dialect = "mysql"


const config = {
  "development": {
    "username": username,
    "password": password,
    "database": database,
    "host": host,
    "dialect": dialect,
    "dialectOptions" : {
      "decimalNumbers" : true
    }
  },
  "test": {
    "username": username,
    "password": password,
    "database": database,
    "host": host,
    "dialect": dialect,
    "dialectOptions" : {
      "decimalNumbers" : true
    }
  },
  "production": {
    "username": username,
    "password": password,
    "database": database,
    "host": host,
    "dialect": dialect,
    "dialectOptions" : {
      "decimalNumbers" : true
    }
  }
}

module.exports = config[process.env.NODE_ENV]