const { request, response } = require('express')
const connection = require('../conexion')


const getContenidoByExperiencia = (req = request, res = response) => {

    const knex = require('knex')(connection)

    const idExperiencia = req.params.id // Obtener el parámetro de la URL

    knex
    .raw('CALL get_contenidos_experiencia(?)', [idExperiencia])
    .then(([contenido]) => {
        return res.status(200).json(contenido[0])
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por Favor hable con el administrador'
        })
    })
    .finally(() => {
        knex.destroy();
    })

}

module.exports = {
    getContenidoByExperiencia
}