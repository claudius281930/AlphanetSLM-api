//modelo de destino (target model).

const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define(
    "Link",
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
      // Este campo será excluido na proxima criação do DB
      dateModify: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      refenrenceName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comeLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      colorTubet: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "link",
      underscored: true,
      timestamps: false,// true
    }
  );
  return Link;
};
