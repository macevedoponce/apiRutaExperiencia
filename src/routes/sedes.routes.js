import { Router } from 'express'
import { getSedes} from '../controllers/sedes.controllers.js'
const router = Router()

router.get('/sedes',getSedes)//todas las sedes


export default router