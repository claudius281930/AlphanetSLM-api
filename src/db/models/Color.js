// modelo de origem (source model) em relação ao modelo Link
const { sequelize, DataTypes } = require("sequelize");
const Link =require("../models/Link");

module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define(
    "Color",// Alias
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      // Campo da associação.
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
      tableName: "color", // Mapeia a mesma tabela no BD
      underscored: true, // boxId => box_id
      timestamps: false,
    }
  );
  Color.associate = (models) => {
    Color.hasOne(models.Link, {
      as: "links", //Nome da relação entre as tabelas envolvidas.
      foreignKey: "box_id", //Campo da associação presente em todas as tabelas de destino;
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
