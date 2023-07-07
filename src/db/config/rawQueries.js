const config = require('../config/config.json');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);


const sqlQuery = 'select * from box';

const rawQuery = sequelize.query(
    sqlQuery,
    {
        type: sequelize.QueryTypes.SELECT
    }
)
.then((result) => {
    console.log(result);
    return result;
})
.catch((error) => console.error(error));

module.exports = rawQuery;