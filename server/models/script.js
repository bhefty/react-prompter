import mongoose from 'mongoose'
const Schema = mongoose.Schema

const scriptSchema = new Schema({
  text: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true }
})

export default mongoose.model('Script', scriptSchema)
