const { Router } = require('express');
const {
  getCarreras,
  getCarrera,
  getCarrerasSede,
  //   postCarrera,
  //   putCarrera,
  //   deleteCarrera,
} = require('../controllers/carrera');

const router = Router();

router.get('/', getCarreras);

router.get('/:id', getCarrera);

router.get('/sede/:id', getCarrerasSede);

// router.post('/', postCarrera)

// router.put('/:id', putCarrera)

// router.delete('/:id', deleteCarrera)

module.exports = router;
