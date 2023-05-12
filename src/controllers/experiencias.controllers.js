import { pool } from '../db.js'

export const getExperiencia = async (req, res) => {

    const idCarrera = req.params.idCarrera;
    const exCicloInicio = req.params.exCicloInicio;
    const exCicloFin = req.params.exCicloFin;

    //const [rows] = await pool.query('SELECT * FROM tblExperiencia WHERE IdCarrera = ? AND ExCicloInicio = ?', [idCarrera, exCicloInicio])
    //res.json(rows[0])

    const [rows] = await pool.query('SELECT * FROM rutaexperiencia.tblExperiencia A inner join rutaexperiencia.tblContenido B WHERE A.IdCarrera = ? AND A.ExCicloInicio <= ? AND A.ExCicloFin >= ? AND A.IdExperiencia = B.IdExperiencia;', [idCarrera, exCicloInicio, exCicloFin])
    //const [rows] = await pool.query('CALL get_experiencias_carrera(?,?,?);', [idCarrera, exCicloInicio, exCicloFin])
    res.json(rows)
      
    
}