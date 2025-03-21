import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import axios from 'axios'

import uploadFile from './middlewares/uploadFile.js'

import ClientRoutes from './routes/client.js'
import AdminRoutes from './routes/admin.js'
import ProductRoutes from './routes/product.js'
import CarouselRoutes from './routes/carousel.js'
import TeamRouters from './routes/team.js'
import MapRouters from './routes/map.js'
import PostRouters from './routes/post.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/uploads', express.static('uploads'))
app.post('/upload', (req, res) => uploadFile(req, res))

app.get('/', (_, res) => {
  res.send(`Hello world.`)
})

app.use('/admin', AdminRoutes)
app.use('/client', ClientRoutes)
app.use('/product', ProductRoutes)
app.use('/carousel', CarouselRoutes)
app.use('/teams', TeamRouters)
app.use('/map', MapRouters)
app.use('/post', PostRouters)

const keepServerAlive = () => {
  setInterval(() => {
    axios
      .get('https://flowers-server-ohej.onrender.com')
      .then(() => console.log('🔄 Server active'))
      .catch(() => console.log('⚠️ Ping failed'))
  }, 10 * 60 * 1000)
}

keepServerAlive()

const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    app.listen(process.env.PORT, () =>
      console.log(`server is running on http://localhost:${process.env.PORT}`)
    )
  } catch (error) {
    console.log(error)
  }
}

startApp()
