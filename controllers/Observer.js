const EventEmitter = require('events');
const carrerasEmitter = new EventEmitter();

// Funci�n para emitir eventos cuando se modifica una carrera
const emitCarreraUpdate = (codigoCarrera) => {
    carrerasEmitter.emit('carreraUpdate', codigoCarrera);
};

module.exports = {
    carrerasEmitter,
    emitCarreraUpdate
};