import express from 'express'
import {
  addPost,
  deletePost,
  getPosts,
  toggleDislike,
  toggleLike,
  toggleShow
} from '../controllers/post.js'

const router = express.Router()

router.post('/', addPost)
router.get('/', getPosts)
router.delete('/:id', deletePost)
router.post('/like', toggleLike)
router.post('/dislike', toggleDislike)
router.post('/show', toggleShow)

export default router
