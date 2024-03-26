const mysql = require('mysql2');
const { mySqlDb } = require('./config');

const dbConfig = {
    host: mySqlDb.host,
    port: mySqlDb.port,
    user: mySqlDb.user,
    multipleStatements: true,
    password: mySqlDb.password,
    database: mySqlDb.database,
};

const pool = mysql.createPool(dbConfig);

pool.getConnection((err) => {
    if (err) {
        console.error('MySQL database connection failed: ' + err.message);
    } else {
        console.log('Successfully connected to the MySQL database');
    }
});

module.exports = pool;
