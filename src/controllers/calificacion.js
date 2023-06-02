const { request, response } = require('express');
const connection = require('../conexion');

const postCalificacion = (req = request, res = response) => {
  const knex = require('knex')(connection);

  const nuevaCalifacion = [req.body.IdCalificacion, req.body.IdExperiencia];

  knex
    .raw('CALL post_calificacion_experiencia(?,?,@resultado)', nuevaCalifacion)
    .then(() => knex.raw('SELECT @resultado'))
    .then(([[codigo]]) => {
      const respuesta = codigo['@resultado'];
      console.log(respuesta);
      if (respuesta === 400) {
        throw new Error('Calificacion no existe');
      }
      if (respuesta === 401) {
        throw new Error('Experiencia no existe');
      }
      return res.status(201).json({
        ok: true,
        msg: `Se envio calificacion `,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        ok: false,
        msg: 'No se pudo enivar calificacion',
      });
    })
    .finally(() => {
      knex.destroy();
    });
};

module.exports = {
  postCalificacion,
};
