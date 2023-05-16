const { Router } = require('express')
const { getBeneficios, getBeneficio, getBeneficiosCarrera, postBeneficio, putBeneficio, deleteBeneficio } = require('../controllers/beneficio')

const router = Router()

router.get('/:id', getBeneficiosCarrera)

module.exports = router