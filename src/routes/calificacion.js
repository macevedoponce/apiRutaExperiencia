const { Router } = require('express');
const { postCalificacion } = require('../controllers/calificacion');

const router = Router();

router.post('/', postCalificacion);

module.exports = router;
