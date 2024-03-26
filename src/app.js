const express = require('express');
const config = require('../config/config');
const app = express();
const port = 3000;

// test routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// to start the server
app.listen(config.server.port, () => {
  console.log(`[${config.server.serverName}] server is listening at http://localhost:${config.server.port}`);
});
