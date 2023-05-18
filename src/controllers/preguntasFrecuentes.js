const { request, response } = require('express')
const connection = require('../conexion')

const getPreguntasFrecuentes = (req = request, res = response) => {

    const knex = require('knex')(connection)

    knex
    .raw('CALL get_preguntas_frecuentes()')  // Utiliza la función raw() para llamar el SP
    .then(([preg_frec]) => {
        return res.status(200).json(preg_frec[0])
    })
    .catch(error => {
        console.log(error)
        return res.status(500).json({
        ok: false,
        msg: "Por Favor hable con el administrador"
        })
    })
    .finally(() => {
        knex.destroy();
    })

}



module.exports = {
    getPreguntasFrecuentes
}
