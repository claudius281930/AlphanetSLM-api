// Normatizar o código, ajuda evitar gambiarras
'use strict';

// Permite trabalhar com o sistema de arquivos do computador
const fs = require('fs');
// Fornece utilitários para trabalhar com caminhos de arquivos e diretórios
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
//const Box = require("../models/Box")
const db = {};

// Criar a variável que recebe a conexão com banco de dados
let sequelize;
// Verificar qual configuração de banco de dados você deseja usar
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
// Usar as configurações do arquivo "config/database.js"
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Verificar a conexão com banco de dados imprimindo a msg de Erro se houver
try {
  console.log("Conexão com o banco de dados realizada com sucesso!");
} catch (error) {
  console.error("Erro: Conexão com o banco de dados não realizado com sucesso! ", error);
}

// Identificar o MODEL
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
// Atribuir a conexão com banco de dados para o objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
