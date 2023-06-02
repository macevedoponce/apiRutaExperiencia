const express = require('express');
const cors = require('cors');
const auth = require('./routes/auth');
const experiencia = require('./routes/experiencia');
const contenido = require('./routes/contenido');
const beneficio = require('./routes/beneficio');
const carrera = require('./routes/carrera');
const sede = require('./routes/sede');
const pregunta = require('./routes/pregunta');
const calificacion = require('./routes/calificacion');
const solicitarInformacion = require('./routes/solicitarInformacion')

// CREACION DEL SERVIDOR
const app = express();
const PORT = 4040;

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// })

app.listen(PORT, () => {
  console.log(`Server runnig at port ${PORT}`);
});

// RUTAS
app.use('/auth', auth);
app.use('/experiencia', experiencia);
app.use('/contenido', contenido);
app.use('/beneficio', beneficio);
app.use('/carrera', carrera);
app.use('/sede', sede);
app.use('/pregunta', pregunta);
app.use('/calificacion', calificacion);
app.use('/solicitar_informacion',solicitarInformacion) //postSubirSolicitudDeInformación
