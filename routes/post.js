import express from 'express'
import {
  addPost,
  deletePost,
  getPosts,
  toggleDislike,
  toggleLike,
  toggleShow
} from '../controllers/post.js'
import isExisted from '../middlewares/isExisted.js'
import IsAdmin from '../middlewares/IsAdmin.js'

const router = express.Router()

router.post('/', isExisted, addPost)
router.get('/', getPosts)
router.delete('/:id', isExisted, deletePost)
router.post('/like', isExisted, toggleLike)
router.post('/dislike', isExisted, toggleDislike)
router.post('/show', isExisted, IsAdmin, toggleShow)

export default router
