import { Router } from 'express'
import { getExperiencias, getExperiencia } from '../controllers/experiencias.controllers.js'
const router = Router()

router.get('/experiencias',getExperiencias)//todas las experiencias
router.get('/experiencias/:idCarrera/:exCicloInicio', getExperiencia);



export default router