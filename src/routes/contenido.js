const { Router } = require('express')
const { getContenidoByExperiencia } = require('../controllers/contenido')

const router = Router()


router.get('/:id', getContenidoByExperiencia)

module.exports = router