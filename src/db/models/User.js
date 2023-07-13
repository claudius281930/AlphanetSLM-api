const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(225),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(225),
        allowNull: false,
      },
    },
    {
      tableName: "user",
      underscored: true,
      timestamps: false, // true
    }
  );
  return User;
};
