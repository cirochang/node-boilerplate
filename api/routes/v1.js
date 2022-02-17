const { Router } = require('express');
const Joi = require('joi');
const swagger = require('../../docs/swagger-v1.json');
const auth = require('../controllers/auth');
const fooController = require('../controllers/foocontroller');
const logger = require('../utils/logger');

const validate = (type, params) => (req, res, next) => {
  const schema = Joi.object().keys(params);
  const { value, error } = Joi.validate(req[type], schema, { allowUnknown: true });
  req[type] = value;
  return error ? res.status(422).send({ message: error }) : next();
};

// Use to catch errors from async functions
const errorHandler = (fn) => (req, res, next) => {
  Promise
    .resolve(fn(req, res, next))
    .catch((err) => {
      logger.error(err.stack);
      return res.status(404).send({ message: 'Internal Server Error' });
    });
};

module.exports = (app) => {
  const apiV1 = Router();
  app.use('/v1', apiV1);

  apiV1.route('/someroute')
    .get(
      auth.authorize,
      validate('query', {
        foobar: Joi.string(),
        size: Joi.number().positive().default(1000).max(10000),
      }),
      errorHandler(fooController.show_all),
    );

  // Swagger File
  apiV1.route('/swagger').get((req, res) => res.send(swagger));
};
