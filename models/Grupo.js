// models/Grupo.js

const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
    cedula : String,
    nota : Number
})

const gruposSchema = new mongoose.Schema({
  ciclo: Number,
  curso: Number,
  numero_de_grupo: Number,
  horario: String,
  profesor : String, 
  estudiantes : [estudianteSchema]
});

module.exports = mongoose.model('Grupo', gruposSchema, 'Grupo');