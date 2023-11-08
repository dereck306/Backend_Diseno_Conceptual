const Alumno = require('../models/Alumno.js');


module.exports = function(app) {
    app.get('/alumnos', async (req, res) => {
        try {
            const alumnos = await Alumno.find();
            res.send(alumnos);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    //http://localhost:3000/alumno/nombre/Luis Morales
    app.get('/alumnos/nombre/:nombre', async (req, res) => {
        try {
            const alumnos = await Alumno.find({ nombre: req.params.nombre });
            res.send(alumnos);
        } catch (err) {
            res.status(500).send(err);
        }
    });


    //http://localhost:3000/alumno/cedula/32004024
    app.get('/alumnos/cedula/:cedula', async (req, res) => {
        try {
            const alumnos = await Alumno.find({ cedula: req.params.cedula });
            res.send(alumnos);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    //http://localhost:3000/alumnos/carrera/IT01
    app.get('/alumnos/carrera/:carreraCodigo', async (req, res) => {
        try {
            const alumnos = await Alumno.find({ carrera: req.params.carreraCodigo });
            res.send(alumnos);
        } catch (err) {
            res.status(500).send(err);
        }
});

}