import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema({
  phoneNumber: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  avatar: [{ type: String }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
})

export default mongoose.model('Client', ClientSchema)
