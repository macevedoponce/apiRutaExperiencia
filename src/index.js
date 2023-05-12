import express from 'express'
import sedesRoutes from './routes/sedes.routes.js'
import experienciasRoutes from './routes/experiencias.routes.js'
import carrerasRoutes from './routes/carreras.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(indexRoutes)
app.use('/api', sedesRoutes)
app.use('/api', experienciasRoutes)
app.use('/api', carrerasRoutes)


//usamos mpm i mysql2 

app.listen(3000)
console.log("Server running on port 3000")