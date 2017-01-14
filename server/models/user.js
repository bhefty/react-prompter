import mongoose from 'mongoose'
const Schema = mongoose.Schema

const scriptSchema = new Schema({
  title: { type: 'String', required: true, unique: true },
  text: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true }
})

const userSchema = new Schema({
  userId: { type: 'String', required: true, unique: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  email: { type: 'String', required: false },
  name: { type: 'String', required: true },
  picture: { type: 'String', required: true },
  scripts: { type: [scriptSchema], required: true }
})

export default mongoose.model('User', userSchema)
