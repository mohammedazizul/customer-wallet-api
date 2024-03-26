const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const config = require('../config/config');
const apiRoutes = require('./routes/apiRoutes');
const authMiddleware = require('../middlewares/authMiddlewares');

app.use(bodyParser.json());

// middlewares 
app.use(authMiddleware);

// serve APIs for specific routes
app.use('/api', apiRoutes);

// error handling middleware (for unhandled errors)
app.use((err, req, res, next) => {
  console.error("ERROR: ", err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// to start the server
app.listen(config.server.port, () => {
  console.log(`[${config.server.serverName}] server is listening at http://localhost:${config.server.port}`);
});
