

import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

//Variables de entorno
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, NODE_ENV } = process.env;

// Conexión Sequelize con MariaDB
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST || 'localhost',
  port: Number(DB_PORT || 3306),
  dialect: 'mysql',
  logging: NODE_ENV === 'development' ? false : false
});

//Registro de modelos

import DroneFactory from './drone.js';
export const DroneModel = DroneFactory(sequelize);

import ParcelFactory from './parcel.js';
export const ParcelModel = ParcelFactory(sequelize);

import MissionFactory from './mission.js';
export const MissionModel = MissionFactory(sequelize);

//User
import UserFactory from './user.js';
export const UserModel = UserFactory(sequelize);



// Un dron puede participar en muchas misiones
DroneModel.hasMany(MissionModel, { foreignKey: 'droneId', onDelete: 'CASCADE' });
MissionModel.belongsTo(DroneModel, { foreignKey: 'droneId' });

// Una parcela puede tener muchas misiones
ParcelModel.hasMany(MissionModel, { foreignKey: 'parcelId', onDelete: 'CASCADE' });
MissionModel.belongsTo(ParcelModel, { foreignKey: 'parcelId' });



export { sequelize };

//Función de prueba

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a MariaDB OK');
  } catch (err) {
    console.error('Error conectando a MariaDB:', err.message);
    throw err;
  }
}