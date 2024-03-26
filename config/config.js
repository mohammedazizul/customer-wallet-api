require("dotenv").config();

module.exports = {
    server: {
        port: process.env.PORT || 5000,
        serverName: process.env.SERVER_NAME,
    },
    apiKey: process.env.API_KEY,
    timezone: process.env.TIME_ZONE,
};
