import express from 'express'
import {
  CreateNewcarousel,
  Deletecarousel,
  GetAllcarousel,
  GetOnecarousel,
  Updatecarousel
} from '../controllers/carousel.js'
import isExisted from '../middlewares/isExisted.js'
import IsAdmin from '../middlewares/IsAdmin.js'

const router = express.Router()

router.get('/', GetAllcarousel)
router.get('/:id', GetOnecarousel)
router.post('/create', isExisted, IsAdmin, CreateNewcarousel)
router.delete('/:id', isExisted, IsAdmin, Deletecarousel)
router.put('/:id', isExisted, IsAdmin, Updatecarousel)

export default router
