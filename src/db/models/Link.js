const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const link = sequelize.define(
    "linkAltoDoPrego",
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
      nomeReferencia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      corTubet: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      linkChega: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "linkchegada_alto_do_prego",
      underscored: true,
      timestamps: false,
    }
  );
  return link;
};
