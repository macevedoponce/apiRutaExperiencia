import { createPool } from 'mysql2/promise'

export const pool = createPool({
    //host: 'localhost',
    //user: 'root',
    //password: '',
    //port: 3306,
    //database: 'prueba'

    host: '144.22.59.87',
    user: 'beatriz',
    password: '#GKHrMhVt9uYd4ox#',
    port: 3306,
    database: 'rutaexperiencia'

})
