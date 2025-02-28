import express from 'express'
import { addMap, getMaps, deleteMap } from '../controllers/map.js'

const router = express.Router()

router.post('/maps', addMap)
router.get('/', getMaps)
router.delete('/maps/:id', deleteMap)

export default router
