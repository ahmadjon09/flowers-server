import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client'
    },
    sms: { type: String, required: true },
    show: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    firstName: { type: String, required: true },
    avatar: [{ type: String, default: '' }]
  },
  { timestamps: true }
)

export default mongoose.model('Post', PostSchema)
