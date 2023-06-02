const { request, response } = require('express');
const connection = require('../conexion');

const getPreguntas = (req = request, res = response) => {
  const knex = require('knex')(connection);

  knex
    .raw('CALL get_preguntas_frecuentes()')
    .then(([[preguntas]]) => res.status(200).json(preguntas))
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Por Favor hable con el administrador',
      });
    })
    .finally(() => {
      knex.destroy();
    });
};

// const getPregunta = (req = request, res = response) => {
//   const idPregunta = req.params.id;

//   return res.status(200).json(`pregunta ${idPregunta}`);
// };

// const postPregunta = (req = request, res = response) => {
//   return res.status(200).json(`postPregunta`);
// };

// const putPregunta = (req = request, res = response) => {
//   const idPregunta = req.params.id;

//   return res.status(200).json(`putPregunta ${idPregunta}`);
// };

// const deletePregunta = (req = request, res = response) => {
//   const idPregunta = req.params.id;

//   return res.status(200).json(`deletePregunta ${idPregunta}`);
// };

module.exports = {
  getPreguntas,
  //   getPregunta,
  //   postPregunta,
  //   putPregunta,
  //   deletePregunta,
};
