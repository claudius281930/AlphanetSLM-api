//modelo de origem (source model) em relação ao modelo Fusion
const { sequelize, DataTypes } = require("sequelize");
const Fusion = require("../models/Fusion");

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
      // Este campo será excluido na proxima criação do DB
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
      // img: {
      //   type: DataTypes.BLOB("medium"),
      //   allowNull: true,
      // },
      // observation: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
    },
    {
      tableName: "box",
      underscored: true,
      timestamps: false, //true
    }
  );
  Box.associate = (models) => {
    Box.hasMany(models.Fusion, {
      as: "fusions", //Nome da relação entre as tabelas envolvidas.
      foreignKey: "box_id", 
      timestamps: false,//true
    });
  };
  return Box;
};
