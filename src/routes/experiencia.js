const { Router } = require('express');
const {
  //   getExperiencia,
  //   getExperiencias,
  postExperiencia,
  putExperiencia,
  deleteExperiencia,
  getExperienciasCarrera,
  getExperienciasAndContendoByCarreraAndCiclo,
} = require('../controllers/experiencia');

const router = Router();

// router.get("/", getExperiencias);

// router.get("/:id", getExperiencia);

router.get('/carrera/:IdCarrera', getExperienciasCarrera);

router.get('/:idCarrera/:exCicloInicio/:exCicloFin', getExperienciasAndContendoByCarreraAndCiclo) //experiencias por ciclo especifico

router.post('/', postExperiencia);

router.put('/:id', putExperiencia);

router.delete('/:id', deleteExperiencia);

module.exports = router;
