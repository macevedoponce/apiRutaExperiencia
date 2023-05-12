import { pool } from '../db.js'


export const getSedes = async (req, res) => {
    const [rows] = await pool.query('CALL get_sedes()')
    res.json(rows[0])
}
