//modelo de origem (source model) em relação ao modelo Link
const { sequelize, DataTypes } = require("sequelize");
const Link =require("../models/Link");

module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define(
    "Color",
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
      colors: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "color",
      underscored: true,
      timestamps: false,
    }
  );
  Color.associate = (models) => {
    Color.hasOne(models.Link, {
      as: "links",
      foreignKey: "box_id", 
      timestamps: false,
    });
    /*
  Color.associate = (models) => {
  Color.belongsToMany(models.Fusion, {
    through: "FusionColor",
    foreignKey: "colorId",
    otherKey: "fusionId",
    as: "fusions",
  });
};
 */
  };
  return Color;
};
