const { request, response } = require('express')
const connection = require('../conexion')


const getCarrerasBySede = (req = request, res = response) => {

    const knex = require('knex')(connection)

    const idSede = req.params.id // Obtener el parámetro de la URL

    knex
    .raw('CALL get_carreras_sede(?)', [idSede])
    .then(([carreras]) => {
        return res.status(200).json(carreras[0])
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
    getCarrerasBySede
}