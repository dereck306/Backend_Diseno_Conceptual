// controllers/MatriculaController.js

const Matricula = require('../models/Matricula.js');

module.exports = function (app) {


    //http://localhost:3000/matricula/codigo/2/cedula/1-1913-1405 a la Programación
    app.post('/matricula/codigo/:codigo/cedula/:cedula', async (req, res) => {
        try {
            let nuevoCurso = { codigo: req.params.codigo };
            Matricula.updateOne({ cedula: req.params.cedula }, {
                $push: {
                    cursos:
                        nuevoCurso
                }
            });
            res.status(200).send({ message: 'Curso agregado con éxito' });
        } catch (err) {
            res.status(500).send(err);
        }
    });

    //http://localhost:3000/matricula/codigo/2/cedula/1-1913-1405 a la Programación
    app.delete('/matricula/eliminar-curso-matriculado/codigo/:codigo/cedula/:cedula', async (req, res) => {
        try {
            let nuevoCurso = { codigo: req.params.codigo };
            Matricula.updateOne({ cedula: req.params.cedula }, {
                $push: {
                    cursos:
                        nuevoCurso
                }
            });

            res.status(200).send({ message: 'Curso eliminado con éxito' });
        } catch (err) {
            res.status(500).send(err);
        }
    });
}
