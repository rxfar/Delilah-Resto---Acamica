const Sequelize = require("sequelize");
const mariadb = require("mariadb");

const dialect = "mariadb";
const user = "root";
const host = "localhost";
const port = 3306;
const dbName = `delilahdb`;
const connectionString = `${dialect}://${user}@${host}:${port}/${dbName}`;
const DataBase = new Sequelize(connectionString);

DataBase
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err) => {
            console.log('Unable to connect to the database:', err);
        });

module.exports = DataBase;