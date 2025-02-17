import mongoose from 'mongoose'

const carouselSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photos: [{ type: String, required: true }]
})

export default mongoose.model('Carousel', carouselSchema)
