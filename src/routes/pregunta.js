const { Router } = require('express');
const {
  getPreguntas,
  //   getPregunta,
  //   postPregunta,
  //   putPregunta,
  //   deletePregunta,
} = require('../controllers/pregunta');

const router = Router();

router.get('/', getPreguntas);

// router.get("/:id", getPregunta);

// router.post("/", postPregunta);

// router.put("/:id", putPregunta);

// router.delete("/:id", deletePregunta);

module.exports = router;
