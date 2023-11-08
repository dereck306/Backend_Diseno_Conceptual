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
}