// controllers/MatriculaController.js

const Grupo = require("../models/Grupo.js");

module.exports = function (app) {
  //http://localhost:3000/grupo/profesor/003-123456-0002C/ciclo-activo/2
  app.get(
    "/grupo/profesor/:cedulaProfesor/ciclo-activo/:cicloActivo",
    async (req, res) => {
      try {
        const cedulaProfesor = req.params.cedulaProfesor;
        const cicloActivo = parseInt(req.params.cicloActivo);

        const grupos = await Grupo.find({
          profesor: cedulaProfesor,
          ciclo: cicloActivo,
        });

        if (grupos.length === 0) {
          res
            .status(404)
            .send({ message: "No tienes grupos asignados en este ciclo." });
        } else {
          const grupoSeleccionado = grupos[0];
          res.status(200).send(grupoSeleccionado);
        }
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({ message: "Error al obtener los grupos del profesor" });
      }
    }
  );

  //http://localhost:3000/grupo/1/cedula-estudiante/:cedula/actualizar-notas/notas/85 a la Programación
  app.post("/registrar-notas/:grupoId", async (req, res) => {
    const grupoId = req.params.grupoId;
    const notas = req.body.notas; // Espera un objeto con las notas

    try {
      const grupo = await Grupo.findById(grupoId).exec();

      if (!grupo) {
        return res.status(404).send({ message: "Grupo no encontrado." });
      }

      if (!grupo.estudiantes || grupo.estudiantes.length === 0) {
        return res
          .status(404)
          .send({ message: "No hay estudiantes en este grupo." });
      }

      // Validar si todas las cédulas en las notas existen en el grupo
      const cedulasGrupo = grupo.estudiantes.map(
        (estudiante) => estudiante.cedula
      );
      const cedulasNotas = Object.keys(notas);
      const cedulasInvalidas = cedulasNotas.filter(
        (cedula) => !cedulasGrupo.includes(cedula)
      );

      if (cedulasInvalidas.length > 0) {
        return res
          .status(400)
          .send({
            message: `Cédulas inválidas: ${cedulasInvalidas.join(", ")}`,
          });
      }

      // Actualizar las notas de los estudiantes
      for (const estudiante of grupo.estudiantes) {
        const cedula = estudiante.cedula;
        if (notas[cedula] !== undefined) {
          estudiante.nota = notas[cedula]; // Actualiza la nota
        }
      }

      await grupo.save(); // Guarda las actualizaciones en el grupo
      res.send({ mensaje: "Notas actualizadas con éxito." });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  //Encontrar Grupos por Curso
  app.get("/grupo/:cursoSeleccionado", async (req, res) => {
    const cursoSeleccionado = parseInt(req.params.cursoSeleccionado);

    try {
      const grupos = await Grupo.find({ curso: cursoSeleccionado });

      if (grupos.length === 0) {
        res.status(404).send({
          mensaje: `No hay grupos disponibles para el curso con código ${cursoSeleccionado}`,
        });
      } else {
        res.send(grupos);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
};
