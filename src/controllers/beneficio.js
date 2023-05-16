const { request, response } = require('express')
const connection = require('../conexion')


const getBeneficiosCarrera = (req = request, res = response) => {

    const knex = require('knex')(connection)

    const IdCarrera = req.params.id

    knex
        .select('*')
        .from('tblBeneficio')
        .where('IdCarrera', IdCarrera)
        .then(beneficios => {
            return res.status(200).json(beneficios)
        })
        .catch(error => {
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
    getBeneficiosCarrera
}