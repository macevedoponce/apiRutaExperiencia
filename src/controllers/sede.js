const { request, response } = require('express');
const connection = require('../conexion');

const getSedes = (req = request, res = response) => {
  const knex = require('knex')(connection);

  knex
    .raw('CALL get_sedes()')
    .then(([[sedes]]) => res.status(200).json(sedes))
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

// const getSede = (req = request, res = response) => {

//     const idSede = req.params.id

//     return res.status(200).json(`Sede ${idSede}`)
// }

// const postSede = (req = request, res = response) => {
//     return res.status(200).json('postSede')
// }

// const putSede = (req = request, res = response) => {

//     const idSede = req.params.id

//     return res.status(200).json(`putSede ${idSede}`)
// }

// const deleteSede = (req = request, res = response) => {

//     const idSede = req.params.id

//     return res.status(200).json(`deleteSede ${idSede}`)
// }

module.exports = {
  getSedes,
  // getSede,
  // postSede,
  // putSede,
  // deleteSede
};
