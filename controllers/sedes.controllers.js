import { pool } from '../db.js'


export const getSedes = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM rutaexperiencia.tblSede;')
    res.json(rows)
}

export const getSedesRandom = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM rutaexperiencia.tblSede ORDER by RAND() limit 4')
    res.json(rows)
}

//export const getSede = async (req, res) => {
//    const [rows] = await pool.query('SELECT * FROM rutaexperiencia.tblSede where IdSede = ?',[req.params.id])
//    res.json(rows[0])
//}