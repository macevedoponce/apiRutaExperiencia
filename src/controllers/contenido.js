const { request, response } = require('express');
const connection = require('../conexion');

// const getContenidos = (req = request, res = response) => {
//   const knex = require("knex")(connection);

//   knex
//     .select("*")
//     .from("tblContenido")
//     .then((contenidos) => {
//       return res.status(200).json(contenidos);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         ok: false,
//         msg: "Por Favor hable con el administrador",
//       });
//     })
//     .finally(() => {
//       knex.destroy();
//     });
// };

// const getContenido = (req = request, res = response) => {
//   const knex = require("knex")(connection);

//   const IdContenido = req.params.IdContenido;

//   knex
//     .select("*")
//     .from("tblContenido")
//     .where("IdContenido", IdContenido)
//     .then(([contenido]) => {
//       return res.status(200).json(contenido);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         ok: false,
//         msg: "Por Favor hable con el administrador",
//       });
//     })
//     .finally(() => {
//       knex.destroy();
//     });
// };

const getContenidosExperiencia = (req = request, res = response) => {
  const knex = require('knex')(connection);

  const { IdExperiencia } = req.params;

  knex
    .raw('CALL get_contenidos_experiencia(?)', [IdExperiencia])
    .then(([[contenidos]]) => res.status(200).json(contenidos))
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

const postContenido = (req = request, res = response) => {
  const knex = require('knex')(connection);

  const nuevoContenido = [
    req.body.CoTitulo,
    req.body.CoDescripcion,
    req.body.CoUrlMedia,
    req.body.IdTipoMedia,
    req.body.IdExperiencia,
  ];

  knex
    .raw('CALL post_contenido(?,?,?,?,?,@resultado)', nuevoContenido)
    .then(() => knex.raw('SELECT @resultado'))
    .then(([[codigo]]) => {
      const respuesta = codigo['@resultado'];
      if (respuesta === 400) {
        throw new Error('Experiencia no existe');
      }
      if (respuesta === 401) {
        throw new Error('Media no existe');
      }
      return res.status(201).json({
        ok: true,
        msg: `Se creo el contenido`,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'No se pudo crear el contenido, Media o Experiencia no existe',
        info: error.message,
      });
    })
    .finally(() => {
      knex.destroy();
    });
};

const putContenido = (req = request, res = response) => {
  const knex = require('knex')(connection);

  const { IdContenido } = req.params;
  const editarContenido = [
    IdContenido,
    req.body.CoTitulo,
    req.body.CoDescripcion,
    req.body.CoUrlMedia,
    req.body.IdTipoMedia,
  ];

  knex
    .raw('CALL put_contenido(?,?,?,?,?,@resultado)', editarContenido)
    .then(() => knex.raw('SELECT @resultado'))
    .then(([[codigo]]) => {
      const respuesta = codigo['@resultado'];
      if (respuesta === 400) {
        throw new Error('Contenido no existe');
      }
      if (respuesta === 401) {
        throw new Error('Media no existe');
      }
      return res.status(200).json({
        ok: true,
        msg: `Contenido ${IdContenido} editado`,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Por Favor hable con el administrador',
        info: error.message,
      });
    })
    .finally(() => {
      knex.destroy();
    });
};

const deleteContenido = async (req = request, res = response) => {
  const knex = require('knex')(connection);

  const IdContenido = req.params.IdContenido;

  await knex
    .raw('CALL delete_contenido(?)', [IdContenido])
    .then(() => {
      return res.status(200).json({
        ok: true,
        msg: `Contenido ${IdContenido} borrado`,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
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
  // getContenidos,
  // getContenido,
  getContenidosExperiencia,
  postContenido,
  putContenido,
  deleteContenido,
};
