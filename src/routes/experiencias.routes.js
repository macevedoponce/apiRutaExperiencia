import { Router } from 'express'
import {getExperiencia } from '../controllers/experiencias.controllers.js'
const router = Router()

router.get('/experiencias/:idCarrera/:exCicloInicio/:exCicloFin', getExperiencia);



export default router