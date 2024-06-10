// modelo de origem (source model) em relação ao modelo Color
const { sequelize, DataTypes } = require("sequelize");
const Link = require("../models/Link");
const Color = require("../models/Color");

module.exports = (sequelize, DataTypes) => {
  const Fusion = sequelize.define(
    "Fusion", // Alias
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
      // Este campo será excluido na proxima criação do DB
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
      tableName: "fusion", // Mapeia a mesma tabela no BD
      underscored: true,// boxId => box_id
      timestamps: false,
    }
  );
  Fusion.associate = (models) => {
    Fusion.hasOne(models.Color, {
      as: "colouring", //Nome da relação entre as tabelas envolvidas.
      foreignKey: "box_id", //Campo da associação presente em todas as tabelas de destino;
      timestamps: false, // true
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
