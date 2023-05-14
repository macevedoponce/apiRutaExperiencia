const { Router } = require('express')
const { postExperienciaCalificacion } = require('../controllers/calificarExperiencia')

const router = Router()

router.post('/', postExperienciaCalificacion)


module.exports = router