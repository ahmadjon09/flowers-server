import express from 'express'

import isExisted from '../middlewares/isExisted.js'
import IsAdmin from '../middlewares/IsAdmin.js'
import {
  CreateNewTeam,
  DeleteTeam,
  GetAllTeams,
  GetOneTeam,
  UpdateTeam
} from '../controllers/team.js'

const router = express.Router()

router.get('/', GetAllTeams)
router.get('/:id', GetOneTeam)
router.post('/create', CreateNewTeam)
router.put('/:id', isExisted, IsAdmin, UpdateTeam)
router.delete('/:id', isExisted, IsAdmin, DeleteTeam)

export default router
