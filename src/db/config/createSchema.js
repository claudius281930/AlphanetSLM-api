const Sequelize = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);

// Função para verificar se o esquema já existe
async function checkSchemaExists() {
  try {
    const query = `SELECT 1 FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = users'${config.development.database}'`;
    const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    return result.length > 0;
  } catch (error) {
    console.error('Erro ao verificar se o esquema existe:', error);
    return false;
  }
}

// Função para criar o schema
async function createSchema() {
  try {
    const schemaExists = await checkSchemaExists();
    if (!schemaExists) {
      await sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${config.development.database}`);
      console.log('Schema criado com sucesso!');
    } else {
      console.log('O schema já existe. Nenhuma ação necessária.');
    }
  } catch (error) {
    console.error('Erro ao criar o schema:', error);
  } finally {
    sequelize.close();
  }
}

// Exportar a função createSchema
module.exports = createSchema;

// const sequelize = new Sequelize('mysql://username:password@host:port');

// sequelize.query('CREATE DATABASE IF NOT EXISTS users')
//   .then(() => {
//     console.log('Banco de dados criado com sucesso!');
//   })
//   .catch((error) => {
//     console.error('Erro ao criar o banco de dados:', error);
//   });


