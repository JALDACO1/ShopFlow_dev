const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../.env'),
});
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

// Arranca el servidor solo cuando la conexión a la base de datos funciona.
async function start() {
    try {
        await sequelize.authenticate();
        console.log('La bd se ha conectado correctamente');

        app.listen(PORT, () => {
            console.log(`El servidor esta corriendo en el puerto ${PORT}`);
        });
    } catch (err) {
        console.error('Error al conectarse con la bd:', err.message);
        process.exit(1);
    }
}

start();




