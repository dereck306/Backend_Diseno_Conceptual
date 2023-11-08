const Profesor = require('../models/Profesor.js');

module.exports = function (app) {
    //http://localhost:3000/profesor/nombre/Juan Perez
    app.get('/profesor/nombre/:nombre', async (req, res) => {
        try {
            const profes = await Profesor.find({ nombre: req.params.nombre });
            res.send(profes);
        } catch (err) {
            res.status(500).send(err);
        }
    });


    //http://localhost:3000/profesor/cedula/2340943243
    app.get('/profesor/cedula/:cedula', async (req, res) => {
        try {
            const profes = await Profesor.find({ cedula: req.params.cedula });
            res.send(profes);
        } catch (err) {
            res.status(500).send(err);
        }
    });
}