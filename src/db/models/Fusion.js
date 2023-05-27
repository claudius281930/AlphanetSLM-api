//modelo de origem (source model) em relação ao modelo Color
const { sequelize, DataTypes } = require("sequelize");
const Link =require("../models/Link");
const Color =require("../models/Color");

module.exports = (sequelize, DataTypes) => {
  const Fusion = sequelize.define(
    "Fusion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      boxId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dateModify: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      numberFusions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "fusion",
      underscored: true,
      timestamps: false,
    }
  );
  Fusion.associate = (models) => {
    Fusion.hasOne(models.Color, {
      as: "colouring",
      foreignKey: "box_id",
      timestamps: false
    });
    /*
  Fusion.associate = (models) => {
  Fusion.belongsToMany(models.Color, {
    through: "FusionColor",
    foreignKey: "fusionId",
    otherKey: "colorId",
    as: "colors",
  });
};

    */
  };
  return Fusion;
};