const { request, response } = require('express')
const connection = require('../conexion')

const getSedes = (req = request, res = response) => {

    const knex = require('knex')(connection)

    knex
    .raw('CALL get_sedes()')  // Utiliza la función raw() para llamar el SP
    .then(([sedes]) => {
        return res.status(200).json(sedes[0])
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

const getSedeAleatoria = async (req = request, res = response) => {

    const knex = require('knex')(connection)
    await knex
        .raw('CALL get_sedes_aleatorio()')
        .then(([sedes]) => {
            return res.status(200).json(sedes[0])
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: "Por favor hable con el administrador."
            })
        })
        .finally(() => {
            knex.destroy();
        })

}


module.exports = {
    getSedes,
    getSedeAleatoria
}
