import express from 'express'
import { addMap, getMaps, deleteMap } from '../controllers/map.js'

const router = express.Router()

router.post('/', addMap)
router.get('/', getMaps)
router.delete('/:id', deleteMap)

export default router
