import express from 'express'
import { addMap, getMaps, deleteMap } from '../controllers/map.js'
import isExisted from '../middlewares/isExisted.js'
import IsAdmin from '../middlewares/IsAdmin.js'

const router = express.Router()

router.post('/', isExisted, IsAdmin, addMap)
router.get('/', getMaps)
router.delete('/:id', isExisted, IsAdmin, deleteMap)

export default router
