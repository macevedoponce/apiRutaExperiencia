const { Router } = require('express')
const { getBeneficios, getBeneficio, getBeneficiosCarrera, postBeneficio, putBeneficio, deleteBeneficio } = require('../controllers/beneficio')

const router = Router()


router.get('/', getBeneficios)

router.get('/:id', getBeneficio)

router.get('/carrera/:id', getBeneficiosCarrera)

router.post('/', postBeneficio)

router.put('/:id', putBeneficio)

router.delete('/:id', deleteBeneficio)



module.exports = router