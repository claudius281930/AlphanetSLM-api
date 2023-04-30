const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const fusoes = sequelize.define(
    "fusoesAltoDoPrego",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allownull: false,
      },
      idAltoDoPrego: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dataCriacao: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      cores: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "fusoes_alto_do_prego",
      underscored: true,
      timestamps: false,
    }
  );
  return fusoes;
};
