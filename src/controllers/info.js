const { request, response } = require('express');
const connection = require('../conexion');

const postInfo = (req = request, res = response) => {
  const knex = require('knex')(connection);

  const nuevaInfo = [req.body.IdCalificacion, req.body.IdExperiencia];

  //   knex
  //     .raw("CALL post_solicitarInfo(?,?,?,?,?,?,?,?,?,?,?,@resultado)", nuevaCalifacion)
  //     .then(() => {
  //       return knex.raw("SELECT @resultado");
  //     })
  //     .then(([[codigo]]) => {
  //       respuesta = codigo["@resultado"];
  //       console.log(respuesta);
  //       if (respuesta === 400) {
  //         throw new Error("Calificacion no existe");
  //       }
  //       if (respuesta === 401) {
  //         throw new Error("Experiencia no existe");
  //       }
  //       return res.status(201).json({
  //         ok: true,
  //         msg: `Se envio calificacion `,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       res.status(400).json({
  //         ok: false,
  //         msg: "No se pudo enivar calificacion",
  //       });
  //     })
  //     .finally(() => {
  //       knex.destroy();
  //     });
};

module.exports = {
  postInfo,
};
