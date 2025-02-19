import mongoose from 'mongoose'

const Team = new mongoose.Schema({
  fsblink: { type: String, required: true },
  twtlink: { type: String, required: true },
  inslink: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  photos: [{ type: String, required: true }]
})

export default mongoose.model('Team', Team)
