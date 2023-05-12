const { Router } = require('express')
const { getExperienciasAndContendoByCarreraAndCiclo } = require('../controllers/experiencia')

const router = Router()

// router.get('/', getExperiencias)

router.get('/:idCarrera/:exCicloInicio/:exCicloFin', getExperienciasAndContendoByCarreraAndCiclo)

module.exports = router