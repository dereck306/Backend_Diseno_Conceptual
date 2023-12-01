// controllers/MatriculaController.js

const Matricula = require("../models/Matricula.js");
const Curso = require("../models/Curso.js");

module.exports = function (app) {
  //http://localhost:3000/matricula/codigo/2/cedula/1-1913-1405 a la Programación
  app.post("/matricula/codigo/:codigo/cedula/:cedula", async (req, res) => {
    try {
      const codigoCurso = req.params.codigo;
      const cedula = req.params.cedula;

      // Encuentra la matrícula por cédula
      const matricula = await Matricula.findOne({ cedula });

      if (!matricula) {
        // Si no se encuentra la matrícula, crea una nueva con el curso
        const nuevaMatricula = new Matricula({
          cedula,
          cursos: [{ codigo: codigoCurso }],
        });
        await nuevaMatricula.save();
      } else {
        // Agrega el curso a la matrícula existente
        await matricula.agregarCurso(codigoCurso);
      }

      res.status(200).send({ message: "Curso agregado con éxito" });
    } catch (err) {
      res.status(500).send(err);
    }
  });
  app.delete(
    "/matricula/eliminar-curso-matriculado/codigo/:codigo/cedula/:cedula",
    async (req, res) => {
      try {
        let nuevoCurso = { codigo: req.params.codigo };
        const result = await Matricula.updateOne(
          { cedula: req.params.cedula },
          {
            $pull: {
              cursos: nuevoCurso,
            },
          }
        );

        res.status(200).send({ message: "Curso eliminado con éxito" });
      } catch (err) {
        res.status(500).send(err);
      }
    }
  );

  //Mostrar Cursos Matriculados por Estudiante
  app.get("/cursos-matriculados/:cedulaEstudiante", async (req, res) => {
    const cedulaEstudiante = req.params.cedulaEstudiante;

    try {
      const matricula = await Matricula.findOne({
        cedula: cedulaEstudiante,
      }).exec();

      if (matricula && matricula.cursos.length > 0) {
        const cursosMatriculados = await Curso.find({
          codigo: { $in: matricula.cursos.map((curso) => curso.codigo) },
        }).exec();
        res.send(cursosMatriculados);
      } else {
        res.status(404).send({
          message: "El estudiante no está matriculado en ningún curso.",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

  // http://localhost:3000/matricula/historial/0192409325
  /*
    En esta funcion HTTP se puede implementar el patron Iterador
    A la hora que se filtra la informacion y se consigue los cursos matriculados del estudiante seleccionado, se puede llamar al
    patron iterador
    debido a que la respuesta de la consulta HTTP devolvera una lista en forma JSON. El iterador pasaria por cada dato dentro de la lista
    y se podria guardar en una variable en forma de lista.
    */
  app.get("/matricula/historial/:cedula", async (req, res) => {
    try {
      const historialMatriculas = await Matricula.find({
        cedula: req.params.cedula,
      });
      if (historialMatriculas.length > 0) {
        res.send(historialMatriculas);
      } else {
        res
          .status(404)
          .send({
            message: "No hay historial de matricula para el estudiante.",
          });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
};
