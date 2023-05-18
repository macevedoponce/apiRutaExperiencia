const { request, response } = require('express')
const connection = require('../conexion')


const getBeneficiosCarrera = (req = request, res = response) => {

    const knex = require('knex')(connection);

    const idCarrera = req.params.id;

    knex
    .raw('CALL get_beneficios_carrera(?)', [idCarrera])
    .then(([result]) => {
        return res.status(200).json(result[0]);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: 'Por favor, hable con el administrador',
        });
    })
    .finally(() => {
        knex.destroy();
    });

}


module.exports = {
    getBeneficiosCarrera
}