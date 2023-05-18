const express = require('express')
const cors = require('cors')
const experiencia = require('./routes/experiencia')
const beneficio = require('./routes/beneficio')
const solicitarInformacion = require('./routes/solicitarInformacion')
const carrera = require('./routes/carrera')
const sede = require('./routes/sede')
const calificarExperiencia = require('./routes/calificarExperiencia')
const preguntasFrecuentes = require('./routes/preguntasFrecuentes')

// CREACION DEL SERVIDOR
const app = express()
//const PORT = 4040
const PORT = 3000

// CORS
app.use(cors())

// Lectura y parseo del body
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// })

app.listen(PORT, () => {
    console.log(`Server runnig at port ${PORT}`)
})


// RUTAS
//app.use('/auth', auth)
//app.use('/experiencia', experiencia)
//app.use('/contenido', contenido)
//app.use('/carrera', carrera)
app.use('/api/sedes', sede)
app.use('/api/carreras', carrera)
app.use('/api/experiencias', experiencia)
app.use('/api/solicitar_informacion',solicitarInformacion)
app.use('/api/calificar_experiencia', calificarExperiencia)
app.use('/api/beneficio', beneficio)
app.use('/api/preguntas_frecuentes', preguntasFrecuentes)