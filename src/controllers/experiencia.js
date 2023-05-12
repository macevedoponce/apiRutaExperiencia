const { request, response } = require('express')
const connection = require('../conexion')

const getExperienciasAndContendoByCarreraAndCiclo = (req = request, res = response) => {

    const knex = require('knex')(connection);

    const { idCarrera, exCicloInicio, exCicloFin } = req.params;

    knex.raw('CALL get_experiencias_carrera_ciclo(?, ?, ?)', [idCarrera, exCicloInicio, exCicloFin])
    .then(([experiencias]) => {
        return res.status(200).json(experiencias[0]);
    })
    .catch((error) => {
        console.log(error);
        return res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
        });
    })
    .finally(() => {
        knex.destroy();
    });

}

module.exports = {
    getExperienciasAndContendoByCarreraAndCiclo
}
