import Express from 'express'
import morgan from 'morgan'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

// Import required DB modules
import scripts from './routes/script.routes'
import dummyData from './dummyData'

const app = new Express()

// Set native promises as mongoose promise
mongoose.Promise = global.Promise

// MongoDB Connection
const MONGO_URI = process.env.REACT_APP_MONGO_URI || 'mongodb://localhost/react-prompter-dev'
mongoose.connect(MONGO_URI, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!')
    throw error
  }

  // insert dummy data into DB
  dummyData()
})


// Apply body Parser and server public assets and routes
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
app.use(Express.static(path.resolve(__dirname, '..', 'build')))
app.use('/api', scripts)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

module.exports = app
