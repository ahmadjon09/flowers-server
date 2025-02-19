import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  sale: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  photos: [{ type: String, required: true }]
})

export default mongoose.model('Product', ProductSchema)
