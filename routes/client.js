import express from 'express'
import {
  ClientLogin,
  ClientRegister,
  DeleteClient,
  GetAllClients,
  GetMe,
  GetOneClient,
  removeFavorite,
  toggleFavorite,
  UpdateClient
} from '../controllers/client.js'
import isExisted from '../middlewares/isExisted.js'
import IsAdmin from '../middlewares/IsAdmin.js'

const router = express.Router()

router.get('/', isExisted, IsAdmin, GetAllClients)
router.get('/me', isExisted, GetMe)
router.post('/register', ClientRegister)
router.get('/:id', GetOneClient)
router.post('/login', ClientLogin)
router.put('/:id', isExisted, UpdateClient)
router.delete('/:id', isExisted, DeleteClient)

router.post('/toggle-favorite', toggleFavorite)
router.post('/remove-favorite', removeFavorite)

export default router
