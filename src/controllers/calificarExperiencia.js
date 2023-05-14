const { request, response } = require('express')
const connection = require('../conexion')


const postExperienciaCalificacion = (req = request, res = response) => {

    const knex = require('knex')(connection)

    
    
    const idCalificacion= req.body.idCalificacion;
    const idExperiencia = req.body.idExperiencia;
    const ecFecha = new Date();



    knex('tblExperienciacalificacion')
        //.raw('CALL post_calificar_experiencia(?, ?)', [idCalificación, idExperiencia])
        .insert({ idCalificacion, idExperiencia, ecFecha })
        .then(() => {
            return res.status(201).json({
                ok: true,
                msg: `Se registró la solicitud de información`
            })
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({
                ok: false,
                msg: 'No se pudo registrar la solicitud de informacion'
            })
        })
        .finally(() => {
            knex.destroy();
        })

}


module.exports = {
    postExperienciaCalificacion
}