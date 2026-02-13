import { DataTypes } from 'sequelize';



export default (sequelize) => {
    const Parcel = sequelize.define('Parcel', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(160),
            allowNull: false
        },

        geojson: {
            type: DataTypes.JSON,
            allowNull: true
        },

        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        ownerId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },

        status: {
            type: DataTypes.ENUM('activa', 'inactiva'),
            allowNull: false,
            defaultValue: 'activa'
        }
    },
    {
        tableName: 'Parcels',
        timestamps: true,
        indexes: [
            { fields: ['ownerId'] }
        ]
    });

    return Parcel;
};