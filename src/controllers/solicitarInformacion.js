const { request, response } = require('express')
const connection = require('../conexion')


const postSolicitarInformacion = (req = request, res = response) => {

    const knex = require('knex')(connection)

    
    
    const SiNombre= req.body.SiNombre;
    const SiApellidoPaterno = req.body.SiApellidoPaterno;
    const SiApellidoMaterno = req.body.SiApellidoMaterno;
    const SiCorreo = req.body.SiCorreo;
    const SiTelefono = req.body.SiTelefono;
    const SiFechaNacimiento = req.body.SiFechaNacimiento;
    const CaNombre = req.body.CaNombre;
    const SeNombre = req.body.SeNombre;
    const SiModalidad = req.body.SiModalidad;
    const SiFechaSolicitud = req.body.SiFechaSolicitud;
    const SiTipoContacto = req.body.SiTipoContacto;

    knex
  .raw('CALL post_solicitarInfo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @resultado)', [SiNombre, SiApellidoPaterno, SiApellidoMaterno, SiCorreo, SiTelefono, SiFechaNacimiento, CaNombre, SeNombre, SiModalidad, SiFechaSolicitud, SiTipoContacto])
  .then(() => {
    return knex
      .raw('SELECT @resultado AS resultado')
      .then(([result]) => {
        const { resultado } = result[0];
        if (resultado === 200) {
          return res.status(201).json({
            ok: true,
            msg: `Se registró la solicitud de información`
          });
        } else {
          return res.status(400).json({
            ok: false,
            msg: 'No se pudo registrar la solicitud de informacion'
          });
        }
      });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Ocurrió un error en el servidor'
    });
  })
  .finally(() => {
    knex.destroy();
  });


}


module.exports = {
    postSolicitarInformacion
}