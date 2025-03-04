import mongoose from 'mongoose'

const MapSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mapsName: { type: String, required: true },
  mapsPhone: { type: Number, required: true },
  mapsTime: { type: String, required: true },
  coordinates: [
    {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  ]
})

export default mongoose.model('Map', MapSchema)
