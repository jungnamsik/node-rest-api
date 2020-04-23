const express = require("express")
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const user = require('./api/user') // ./api/users/index.js - index.js 생략 가능

app.use(logger('dev'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/users', user) // /users router 를 정의. 위임


// app.listen(3000, () => {   console.log('running');}) // bin/www.js ~~


module.exports = app 
