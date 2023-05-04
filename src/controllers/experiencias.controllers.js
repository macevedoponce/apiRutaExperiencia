import { pool } from '../db.js'


export const getExperiencias = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM rutaexperiencia.tblExperiencia;')
    res.json(rows)
}


export const getExperiencia = async (req, res) => {

    const idCarrera = req.params.idCarrera;
    const exCicloInicio = req.params.exCicloInicio;

    //const [rows] = await pool.query('SELECT * FROM tblExperiencia WHERE IdCarrera = ? AND ExCicloInicio = ?', [idCarrera, exCicloInicio])
    //res.json(rows[0])

    const [rows] = await pool.query('SELECT * FROM rutaexperiencia.tblExperiencia WHERE IdCarrera = ? AND ExCicloInicio = ?', [idCarrera, exCicloInicio])
    res.json(rows)
      
    
}