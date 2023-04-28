import { Router } from 'express'
import { getSedes, getSedesRandom } from '../controllers/sedes.controllers.js'
const router = Router()

router.get('/sedes',getSedes)//todas las sedes
router.get('/sedesRandom',getSedesRandom)//solo sedes aleatorias 
//router.get('/sedes/:id',getSede) // get all sedes where id = ?


export default router