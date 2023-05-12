const { Router } = require('express')
const { getCarrerasBySede } = require('../controllers/carrera')

const router = Router()


router.get('/:id', getCarrerasBySede)

// router.post('/', postCarrera)

// router.put('/:id', putCarrera)

// router.delete('/:id', deleteCarrera)

module.exports = router