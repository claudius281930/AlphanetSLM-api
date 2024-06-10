const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(225),
        allowNull: false,
        //unique: true,
      },
      password: {
        type: DataTypes.STRING(225),
        allowNull: false,
      },
      // isAdmin: {
      //   type: DataTypes.STRING(10),
      //   allowNull: false,
      // },
    },
    {
      tableName: "user",
      underscored: true, // boxId => box_id
      timestamps: false, //true para gerar updateAt e createAt;
    }
  );
  //Cria uma tabela User na base automaticamente;
  // User.sync();
  return User;
};
