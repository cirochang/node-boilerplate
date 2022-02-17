const express = require('express');
const bodyParser = require('body-parser');
const { name, version } = require('../package.json');
const logger = require('./utils/logger');
const v1 = require('./routes/v1');

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// HealthCheck
app.route('/').get((req, res) => res.send({ name, version }));
// Create a server side router
v1(app);
// 404
app.route('*').get((req, res) => res.status(404).send({ message: 'Not found' }));

// Start the server
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

module.exports = app;
