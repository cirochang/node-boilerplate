const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const v1 = require('./routes/v1');

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Create a server side router
v1(app);

// Start the server
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

module.exports = app;
