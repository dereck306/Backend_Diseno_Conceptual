const Ciclo = require('../models/Ciclo.js');

module.exports = function(app) {
    app.get('/ciclo-activo', async (req, res) => {
        try {
            const ciclo = await Ciclo.findOne({activo : true});
            if (ciclo) {
                res.send(ciclo);
            } else {
                res.status(404).send({ message: "Ciclo not found" });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

    //http://localhost:3000/ciclos/annio/2024
    app.get('/ciclos/annio/:annio', async (req, res) => {
    try {
        const annio = parseInt(req.params.annio); 
        const ciclos = await Ciclo.find({ annio: annio });
        if (ciclos.length > 0) {
            res.send(ciclos);
        } else {
            res.status(404).send({ message: 'No cycles found for the year.' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
    });

    //http://localhost:3000/ciclo/activar/1
    app.put('/ciclo/activar/:codigo', async (req, res) => {
    const codigo = parseInt(req.params.codigo); 
    try {
        const result = await Ciclo.updateOne(
            { codigo: codigo },
            { $set: { activo: true } }
        );

        if (result.matchedCount > 0) {
            if (result.modifiedCount > 0) {
                res.send({ message: "Ciclo has been set as active." });
            } else {
                res.send({ message: "Ciclo was already active." });
            }
        } else {
            res.status(404).send({ message: "Ciclo not found" });
        }
    } catch (err) {
        res.status(500).send(err);
    }
    });

}