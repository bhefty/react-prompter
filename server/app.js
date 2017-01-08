const express = require('express')
const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
const getClientEnvironment = require('../config/env')

const app = express()

const MONGO_URI = process.env.REACT_APP_MONGO_URI || 'mongodb://localhost/react-prompter-dev'
mongoose.connect(MONGO_URI)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('connected!')

  const router = express.Router()
  let getScripts = (script, callback) => {
    db.collection('scripts.co').find({}).toArray(callback)
  }

  app.get('/scripts', (req, res) => {
    console.log('in /scripts')
    let body = req.body
    getScripts(body, (err, data) => {
      if (err) {
        console.log(err)
        return res(err)
      } else {
        console.log(typeof data)
        return res.json(data)
      }
    })
  })
})

let env = getClientEnvironment('')
console.log('process.env', env)

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

module.exports = app
