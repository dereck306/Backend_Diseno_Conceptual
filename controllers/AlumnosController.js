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
}