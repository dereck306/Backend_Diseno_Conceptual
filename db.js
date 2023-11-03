const mongoose = require('mongoose');

let connectionInstance;

async function connectDB() {
    if (!connectionInstance) {
        try {
            connectionInstance = await mongoose.connect('mongodb://localhost:27017/LaboratorioClase', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Conexión a MongoDB exitosa.');
        } catch (err) {
            console.error(err);
        }
    }
    return connectionInstance;
}

module.exports = connectDB;
