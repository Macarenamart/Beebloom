
import { DataTypes } from "sequelize";

export default function UserFactory(sequelize) {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      passwordHash: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  return User;
}