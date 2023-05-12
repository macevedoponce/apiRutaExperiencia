const { Router } = require('express')
const { postSolicitarInformacion } = require('../controllers/solicitarInformacion')

const router = Router()

router.post('/', postSolicitarInformacion)


module.exports = router