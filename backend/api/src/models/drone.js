
import { DataTypes } from 'sequelize';



export default (sequelize) => {
  const Drone = sequelize.define('Drone', {
    //Identificador único (autoincremental)
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },

    //Nombre del dron (obligatorio)
    name: {
      type: DataTypes.STRING(120),
      allowNull: false
    },

    //Número de serie (obligatorio y único)
    serial: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true
    },

    //Estado (solo tres valores posibles)
    status: {
      type: DataTypes.ENUM('disponible', 'polinizando', 'fuera_de_servicio'),
      allowNull: false,
      defaultValue: 'disponible'
    },

    //Descripción breve del dron (opcional)
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },

    //URL de la imagen del dron (opcional)
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    tableName: 'Drones', // Nombre exacto de la tabla en la base de datos
    timestamps: true     // Añade automáticamente createdAt y updatedAt
  });

  // Devuelve el modelo para poder usarlo fuera
  return Drone;
};

image_url: {
  type: DataTypes.STRING(255)
}