//modelo de origem (source model) em relação ao modelo Fusion
const { sequelize, DataTypes } = require("sequelize");
const Fusion =require("../models/Fusion");

module.exports = (sequelize, DataTypes) => {
  const Box = sequelize.define(
    "Box",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      /*boxId:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },*/
      dateModify: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      nameDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      locale: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      activeCto: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      networkTechnology: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "box",
      underscored: true,
      timestamps: false,
    }
  );
  Box.associate = (models) => {
    Box.hasMany(models.Fusion, {
      as: "fusions",
      foreignKey: "box_id",
      timestamps: false
    });
  };
  
  return Box;
};
