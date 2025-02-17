import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import multer from 'multer'
import crypto from 'crypto'
import path from 'path'

import ClientRoutes from './routes/client.js'
import AdminRoutes from './routes/admin.js'
import ProductRoutes from './routes/product.js'
import CarouselRoutes from './routes/carousel.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    const hash = crypto.randomBytes(16).toString('hex')
    const ext = path.extname(file.originalname)
    cb(null, `${hash}${ext}`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false)
    }
    cb(null, true)
  }
})

app.use('/uploads', express.static('uploads'))

app.post('/upload', (req, res) => {
  upload.array('photos')(req, res, err => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res
          .status(400)
          .json({ message: 'File size is too large. Max limit is 10MB.' })
      }
    } else if (err) {
      return res.status(400).json({ message: err.message })
    }

    const uploadedImages = req.files.map(
      file => `${req.protocol}://localhost:7777/uploads/${file.filename}`
    )
    res.status(200).json({
      message: 'Images successfully uploaded!',
      photos: uploadedImages
    })
  })
})

app.get('/', (_, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome Developers</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r to-gray-800 text-white">
      <div class="p-8 bg-gray-300 rounded-lg shadow-xl text-center">
        <h1 class="text-4xl font-extrabold text-pink-600 animate-pulse">Hello Developers!</h1>
        <p class="mt-6 text-gray-700">This is not the page you are looking for!</p>
        <a href="https://www.youtube.com/" class="mt-10 inline-block px-6 py-3 animate-bounce text-lg font-semibold text-white bg-pink-600 rounded-full shadow-md hover:bg-pink-700 transition-all">
          Main app ➜
        </a>
      </div>
    </body>
    </html>
  `)
})

app.use('/admin', AdminRoutes)
app.use('/client', ClientRoutes)
app.use('/product', ProductRoutes)
app.use('/carousel', CarouselRoutes)

const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    app.listen(process.env.PORT, () =>
      console.log(
        `server is running on http://localhost:${process.env.PORT} ok`
      )
    )
  } catch (error) {
    console.log(error)
  }
}

startApp()
