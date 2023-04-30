const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const caixa = sequelize.define(
    "bprv",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allownull: false,
      },
      dataCriacao: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      nomeDescricao: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      local: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      numFusoes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      detalheFusoes: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ativaCto: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tecnologiaRede: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "bprv",
      underscored: true,
      timestamps: false,
    }
  );
  return caixa;
};