import express from 'express'
import {
  ClientLogin,
  ClientRegister,
  DeleteClient,
  GetAllClients,
  GetMe,
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
router.post('/login', ClientLogin)
router.put('/:id', isExisted, UpdateClient)
router.delete('/:id', isExisted, DeleteClient)

//Favorite

router.post('/toggle-favorite', toggleFavorite)
router.post('/remove-favorite', removeFavorite)

export default router
