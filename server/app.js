import Express from 'express'
import morgan from 'morgan'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

// Import required modules
// import Routes from '../src/routes'
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
// const db = mongoose.connection
//
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', () => {
//   console.log('connected to database!')
//
//   const router = express.Router()
//
//   let getScripts = (callback) => {
//     let results = []
//     db.collection('scripts.co').find({})
//       .toArray((err, data) => {
//         if (err) throw err
//         data.forEach((data) => {
//           results.push(data)
//         })
//         callback(results)
//       })
//   }
//
//   app.get('/api/all-scripts', (req, res) => {
//     getScripts((data) => {
//       return res.json(data)
//     })
//   })
// })

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
