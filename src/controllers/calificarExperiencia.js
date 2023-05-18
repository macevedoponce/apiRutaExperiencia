const { request, response } = require('express')
const connection = require('../conexion')


const postExperienciaCalificacion = (req = request, res = response) => {

    const knex = require('knex')(connection)

    
    
    const idCalificacion= req.body.idCalificacion;
    const idExperiencia = req.body.idExperiencia;
    //const ecFecha = new Date();


    knex.raw('CALL post_calificacion_experiencia(?, ?, @resultado)', [idCalificacion, idExperiencia])
    .then(() => {
      return knex.raw('SELECT @resultado AS resultado');
    })
    .then(result => {
      const resultado = result[0][0].resultado;
  
      if (resultado === 200) {
        return res.status(201).json({
          ok: true,
          msg: 'Se registró la solicitud de información'
        });
      } else if (resultado === 400) {
        return res.status(400).json({
          ok: false,
          msg: 'No se pudo registrar la solicitud de información. La calificación no existe.'
        });
      } else if (resultado === 401) {
        return res.status(400).json({
          ok: false,
          msg: 'No se pudo registrar la solicitud de información. La experiencia no existe.'
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Por favor, hable con el administrador'
      });
    })
    .finally(() => {
      knex.destroy();
    });
    

}


module.exports = {
    postExperienciaCalificacion
}