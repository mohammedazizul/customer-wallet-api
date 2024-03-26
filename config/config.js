require("dotenv").config();

module.exports = {
    server: {
        port: process.env.PORT || 5000,
        serverName: process.env.SERVER_NAME,
    },
    mySqlDb: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'cw_db',
        port: process.env.DB_PORT || 3306
    },
    apiKey: process.env.API_KEY,
    timezone: process.env.TIME_ZONE,
};
