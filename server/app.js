const express = require('express')
const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
const getClientEnvironment = require('../config/env')

const app = express()

// mongoose.connect()
let env = getClientEnvironment('')
console.log('process.env', env)

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

module.exports = app
