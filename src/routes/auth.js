const { Router } = require('express');
const { loginUsuario, newUsuario } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/user', newUsuario);

router.post(
  '/login',
  [
    check('user', 'El usuario es obligatorio').isString(),
    check('password', 'La contraseña es obligatoria').isString(),
    validarCampos,
  ],
  loginUsuario
);

module.exports = router;
