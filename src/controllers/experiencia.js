const { request, response } = require('express');
const connection = require('../conexion');

// const getExperiencias = (req = request, res = response) => {
//   const knex = require("knex")(connection);

//   knex
//     .select("*")
//     .from("tblExperiencia")
//     .then((experiencias) => {
//       return res.status(200).json(experiencias);
//     })
//     .catch((error) => {
//       console.log(error);
//       return res.status(500).json({
//         ok: false,
//         msg: "Por Favor hable con el administrador",
//       });
//     })
//     .finally(() => {
//       knex.destroy();
//     });
// };

// const getExperiencia = async (req = request, res = response) => {
//   const knex = require("knex")(connection);

//   const IdExperiencia = req.params.id;

//   await knex
//     .select("*")
//     .from("tblExperiencia")
//     .where("IdExperiencia", IdExperiencia)
//     .then(([experiencia]) => {
//       return res.status(200).json(experiencia);
//     })
//     .catch((error) => {
//       console.log(error);
//       return res.status(500).json({
//         ok: false,
//         msg: "Por Favor hable con el administrador",
//       });
//     })
//     .finally(() => {
//       knex.destroy();
//     });
// };

const getExperienciasCarrera = (req = request, res = response) => {
  const knex = require('knex')(connection);

  const { IdCarrera } = req.params;

  knex
    .raw('CALL get_experiencias_carrera(?)', [IdCarrera])
    .then(([[experiencias]]) => res.status(200).json(experiencias))
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

const getExperienciasAndContendoByCarreraAndCiclo = (req = request, res = response) => {

  const knex = require('knex')(connection);

  const { idCarrera, exCicloInicio, exCicloFin } = req.params;

  knex.raw('CALL get_experiencias_carrera_ciclo(?, ?, ?)', [idCarrera, exCicloInicio, exCicloFin])
  .then(([experiencias]) => {
      return res.status(200).json(experiencias[0]);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
      });
    })
    .finally(() => {
      knex.destroy();
    });

}

const postExperiencia = async (req = request, res = response) => {
  const knex = require('knex')(connection);

  const nuevaExperiencia = [
    req.body.ExNombre,
    req.body.ExCicloInicio,
    req.body.ExCicloFin,
    req.body.ExFila,
    req.body.ExIconoUrl,
    req.body.IdCarrera,
  ];

  knex
    .raw(
      'CALL post_experiencia(?,?,?,?,?,?,@ex_id,@resultado)',
      nuevaExperiencia
    )
    .then(() => knex.raw('SELECT @ex_id, @resultado'))
    .then(([[result]]) => {
      const id = result['@ex_id'];
      const resultado = result['@resultado'];
      if (resultado === 400) {
        throw new Error('Posicion de ciclos incorrecto');
      }
      if (resultado === 401) {
        throw new Error('Fila incorrecta');
      }
      if (resultado === 402) {
        throw new Error('IdCarrera no encontrado');
      }
      return res.status(201).json({
        ok: true,
        msg: `Experiencia creada exitosamente`,
        id,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Por Favor hable con el administrador',
        info: error.message,
      });
    })
    .finally(() => {
      knex.destroy();
    });
};

const putExperiencia = (req = request, res = response) => {
  const knex = require('knex')(connection);

  const IdExperiencia = req.params.id;

  const nuevaExperiencia = [
    IdExperiencia,
    req.body.ExNombre,
    req.body.ExCicloInicio,
    req.body.ExCicloFin,
    req.body.ExFila,
    req.body.ExIconoUrl,
  ];

  knex
    .raw('CALL put_experiencia(?,?,?,?,?,?,@resultado)', nuevaExperiencia)
    .then(() => knex.raw('SELECT @resultado'))
    .then(([[result]]) => {
      const resultado = result['@resultado'];
      if (resultado === 400) {
        throw new Error('Experiencia no existe');
      }
      if (resultado === 401) {
        throw new Error('Posición ciclos incorrecto');
      }
      if (resultado === 402) {
        throw new Error('Fila incorrecta');
      }
      return res.status(200).json({
        ok: true,
        msg: `Experiencia ${IdExperiencia} editada`,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Por Favor hable con el administrador',
        info: error.message,
      });
    })
    .finally(() => {
      knex.destroy();
    });
};

const deleteExperiencia = async (req = request, res = response) => {
  const knex = require('knex')(connection);

  const IdExperiencia = req.params.id;

  await knex
    .raw('CALL delete_experiencia(?)', [IdExperiencia])
    .then(() => {
      return res.status(200).json({
        ok: true,
        msg: `Experiencia ${IdExperiencia} eliminada`,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Por Favor hable con el administrador',
        info: error.message,
      });
    })
    .finally(() => {
      knex.destroy();
    });
};

module.exports = {
  // getExperiencias,
  // getExperiencia,
  getExperienciasCarrera,
  getExperienciasAndContendoByCarreraAndCiclo,
  postExperiencia,
  putExperiencia,
  deleteExperiencia,
};
