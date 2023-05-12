import { pool } from '../db.js'


export const getCarreras = async (req, res) => {
    const idSede = req.params.idSede
    //const [rows] = await pool.query('SELECT * FROM rutaexperiencia.tblCarrera where IdSede=?;',[idSede])
    const [rows] = await pool.query('CALL get_carreras_sede(?)',[idSede])
    res.json(rows[0])
}
