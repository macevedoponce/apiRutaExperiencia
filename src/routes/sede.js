const { Router } = require('express')
const { getSedes, getSedeAleatoria } = require('../controllers/sede')

const router = Router()

router.get('/', getSedes)

router.get('/sedesRandom', getSedeAleatoria)


module.exports = router