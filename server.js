const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');

const app = express();
const PORT = 3000;

// Conexión a MongoDB
connectDB();

app.use(bodyParser.json());

const alumnosController = require('./controllers/AlumnosController.js');
alumnosController(app);
const cursosController = require('./controllers/CursoController.js');
cursosController(app);
const carrerasController = require('./controllers/CarreraController.js');
carrerasController(app);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});