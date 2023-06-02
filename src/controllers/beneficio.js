const { request, response } = require('express');
const connection = require('../conexion');

// const getBeneficios = (req = request, res = response) => {
//   return res.status(200).json(`beneficios`);
// };

// const getBeneficio = (req = request, res = response) => {
//   const idBeneficio = req.params.id;

//   return res.status(200).json(`beneficio ${idBeneficio}`);
// };

const getBeneficiosCarrera = (req = request, res = response) => {
  const knex = require('knex')(connection);

  const IdCarrera = req.params.id;

  knex
    .raw('CALL get_beneficios_carrera(?)', [IdCarrera])
    .then(([[beneficios]]) => res.status(200).json(beneficios))
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Por Favor hable con el administrador',
      });
    })
    .finally(() => {
      knex.destroy();
    });
};

const postBeneficio = (req = request, res = response) => {
  const knex = require('knex')(connection);

  const nuevoBeneficio = [req.body.BeDescripcion, req.body.IdCarrera];

  knex
    .raw('CALL post_beneficio(?,?,@resultado)', nuevoBeneficio)
    .then(() => knex.raw('SELECT @resultado'))
    .then(([[codigo]]) => {
      const respuesta = codigo['@resultado'];
      if (respuesta === 400) {
        throw new Error('Carrera no existe');
      }
      return res.status(201).json({
        ok: true,
        msg: `Se creo el beneficio `,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        ok: false,
        msg: 'No se pudo crear el beneficio, Carrera no existe',
      });
    })
    .finally(() => {
      knex.destroy();
    });
};

const putBeneficio = (req = request, res = response) => {
  const knex = require('knex')(connection);
  const idBeneficio = +req.params.id;

  const editBeneficio = [idBeneficio, req.body.BeDescripcion];

  knex
    .raw('CALL put_beneficio(?,?,@resultado)', editBeneficio)
    .then(() => knex.raw('SELECT @resultado'))
    .then(([[codigo]]) => {
      const respuesta = codigo['@resultado'];
      if (respuesta === 400) {
        throw new Error('Beneficio no existe');
      }
      return res.status(200).json({
        ok: true,
        msg: `Beneficio ${idBeneficio} editado`,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Comuniquese con el administrador',
        info: error.message,
      });
    })
    .finally(() => {
      knex.destroy();
    });
};

const deleteBeneficio = (req = request, res = response) => {
  const knex = require('knex')(connection);
  const idBeneficio = req.params.id;
  knex
    .raw('CALL delete_beneficio(?)', [idBeneficio])
    .then(() => {
      return res.status(200).json({
        ok: true,
        msg: `Beneficio ${idBeneficio} borrado`,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Comuniquese con el administrador',
        info: error.message,
      });
    })
    .finally(() => {
      knex.destroy();
    });
};

module.exports = {
  // getBeneficios,
  // getBeneficio,
  getBeneficiosCarrera,
  postBeneficio,
  putBeneficio,
  deleteBeneficio,
};
