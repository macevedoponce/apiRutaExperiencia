const { Router } = require('express')
const { getPreguntasFrecuentes } = require('../controllers/preguntasFrecuentes')

const router = Router()

router.get('/', getPreguntasFrecuentes)


module.exports = router