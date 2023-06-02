const { request, response } = require('express');
const connection = require('../conexion');

const getCarreras = (_, res = response) => {
  const knex = require('knex')(connection);

  knex
    .raw('CALL get_carreras()')
    .then(([[carreras]]) => res.status(200).json(carreras))
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

const getCarrera = (req = request, res = response) => {
  const knex = require('knex')(connection);
  const idCarrera = req.params.id;

  knex
    .raw('CALL get_carrera(?)', [idCarrera])
    .then(([[[carrera]]]) => res.status(200).json(carrera))
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

const getCarrerasSede = (req = request, res = response) => {
  const knex = require('knex')(connection);
  const idSede = req.params.id;

  knex
    .raw('CALL get_carreras_sede(?)', [idSede])
    .then(([[carreras]]) => res.status(200).json(carreras))
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

// const postCarrera = (req = request, res = response) => {

//     return res.status(200).json(`postCarrera`)

// }

// const putCarrera = (req = request, res = response) => {

//     const idCarrera = req.params.id

//     return res.status(200).json(`putCarrera ${idCarrera}`)
// }

// const deleteCarrera = (req = request, res = response) => {

//     const idCarrera = req.params.id

//     return res.status(200).json(`deleteCarrera ${idCarrera}`)
// }

module.exports = {
  getCarreras,
  getCarrera,
  getCarrerasSede,
  // postCarrera,
  // putCarrera,
  // deleteCarrera
};
