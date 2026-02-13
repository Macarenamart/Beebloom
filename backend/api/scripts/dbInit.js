import { sequelize } from '../src/models/index.js';



async function init () {
    try{
    
        console.log('Conectando a la base de datos...');
        await sequelize.authenticate(); //Llama al metodo se sequelize, prueba la conexion y si va bien sigue.
        console.log('Conexion a MariaDB OK'); //Confirmación visual de que la conexion funciona

    //Logs de verificación
    console.log('BD destino:', sequelize.config.database);
    console.log('Modelos registrados:', Object.keys(sequelize.models));

        //Pide a Sequelize que sincronice los modelos con la base de datos
        //Crea las tablas que no existan todavía
        await sequelize.sync({ alter: true });
        console.log('tablas creadas o actualizadas correctamente');

    //Bloque de captura de errores
    //Si falla el metodo authenticate o sync mostramos un mensaje y no crashea
    } catch (error) {
        console.error('Error inicializando la base de datos:', error.message);
    } finally {
        await sequelize.close();
        console.log('Conexión creada');
    }
}

init();