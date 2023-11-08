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

    //Mostrar Cursos Matriculados por Estudiante 
    app.get('/cursos-matriculados/:cedulaEstudiante', async (req, res) => {
    const cedulaEstudiante = req.params.cedulaEstudiante;
    
    try {
        const matricula = await Matricula.findOne({ cedula: cedulaEstudiante }).exec();
    
        if (matricula && matricula.cursos.length > 0) {
        const cursosMatriculados = await Curso.find({ codigo: { $in: matricula.cursos.map((curso) => curso.codigo) } }).exec();
        res.send(cursosMatriculados);
        } else {
        res.status(404).send({ message: 'El estudiante no está matriculado en ningún curso.' });
        }
    } catch (error) {
        res.status(500).send(err);
    }
    });
      
}
