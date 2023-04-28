import { Router } from 'express'
import { ping } from '../controllers/index.controllers.js'

const router = Router()
//prueba
router.get('/ping', ping)

export default router