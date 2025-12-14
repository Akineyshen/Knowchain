import { Router } from 'express'
import { withdrawController } from './controller'
import { ensureAuthenticated } from '../../middlewares/auth'

const router = Router()

router.post('/', ensureAuthenticated, withdrawController)

export default router
