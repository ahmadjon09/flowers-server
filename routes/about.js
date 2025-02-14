import express from 'express'
import {
  CreateNewAbout,
  DeleteAbout,
  GetAllAbout,
  GetOneAbout,
  UpdateAbout
} from '../controllers/about.js'
import isExisted from '../middlewares/isExisted.js'
import IsAdmin from '../middlewares/IsAdmin.js'

const router = express.Router()

router.get('/', GetAllAbout)
router.get('/:id', GetOneAbout)
router.post('/create', isExisted, IsAdmin, CreateNewAbout)
router.delete('/:id', isExisted, IsAdmin, DeleteAbout)
router.put('/:id', isExisted, IsAdmin, UpdateAbout)

export default router
