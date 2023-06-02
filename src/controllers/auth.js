const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const connection = require('../conexion');

// const { generarJWT } = require('../helpers/jwt.js')

const newUsuario = async (req = request, res = response) => {
  const knex = require('knex')(connection);

  const { UsDNI, IdCarrera, UsEmail } = req.body;

  const newUser = req.body;
  delete newUser.IdCarrera;

  try {
    // VERIFICAR SI EL EMAIL YA ESTA REGISTRADO
    let usuario = await knex
      .select('*')
      .from('tblUsuario')
      .where('UsEmail', UsEmail)
      .then((r) => r[0]);
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya esta registrado',
      });
    }

    // VERIFICAR SI EL DNI YA ESTA REGISTRADO
    usuario = await knex
      .select('*')
      .from('tblUsuario')
      .where('UsDNI', UsDNI)
      .then((r) => r[0]);

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El DNI ya esta registrado',
      });
    }

    // VERIFICAR SI LA CARRERA EXISTE
    const carrera = await knex
      .select('*')
      .from('tblCarrera')
      .where('IdCarrera', IdCarrera)
      .then((r) => r[0]);

    if (!carrera) {
      return res.status(400).json({
        ok: false,
        msg: 'La carrera no existe',
      });
    }

    // ENCRIPTAR CONTRASEÑA
    const salt = bcrypt.genSaltSync();
    newUser.UsContrasena = bcrypt.hashSync(newUser.UsContrasena, salt);

    // CREAR USUARIO
    const [IdUsuario] = await knex.insert(newUser).into('tblUsuario');

    // CREAR COORDINADOR
    const newCoor = { IdCarrera, IdUsuario };
    const [IdCoordinador] = await knex.insert(newCoor).into('tblCoordinador');
    knex.destroy();
    return res.status(201).json({
      ok: true,
      msg: 'coordinador creado',
      IdCoordinador,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por Favor hable con el administrador',
    });
  }
};

const loginUsuario = async (req = request, res = response) => {
  const knex = require('knex')(connection);

  const { user, password } = req.body;

  knex
    .select('*')
    .from('tblUsuario')
    .join(
      'tblCoordinador',
      'tblCoordinador.IdUsuario',
      '=',
      'tblUsuario.IdUsuario'
    )
    .join('tblCarrera', 'tblCoordinador.IdCarrera', '=', 'tblCarrera.IdCarrera')
    .join('tblSede', 'tblCarrera.IdSede', '=', 'tblSede.IdSede')
    .where('UsEmail', user)
    .then(([usuario]) => {
      if (!usuario) {
        return res.status(500).json({
          ok: false,
          msg: 'El usuario no existe',
        });
      }
      const validPassword = bcrypt.compareSync(password, usuario.UsContrasena);
      if (!validPassword) {
        return res.status(500).json({
          ok: false,
          msg: 'La contraseña no coincide',
        });
      }
      return res.json({
        ok: true,
        idCarrera: usuario.IdCarrera,
        carrera: usuario.CaNombre,
        sede: usuario.SeNombre,
        ciclos: usuario.CaCantidadCiclos,
      });
    })
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

module.exports = {
  loginUsuario,
  newUsuario,
};
