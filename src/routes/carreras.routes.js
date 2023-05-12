import { Router } from 'express'
import { getCarreras } from '../controllers/carreras.controller.js'

const router = Router()

router.get('/carreras/:idSede',getCarreras)//todas las carreras


export default router