const { Router } = require('express');
const Joi = require('joi');
const swagger = require('../../docs/swagger.json');
const { name, version } = require('../../package.json');
const auth = require('../controllers/auth');
const fooController = require('../controllers/foocontroller');
const logger = require('../utils/logger');

const validateQuery = queryKeys => (req, res, next) => {
  const querySchema = Joi.object().keys(queryKeys);
  const { value, error } = Joi.validate(req.query, querySchema, { allowUnknown: true });
  req.query = value;
  return error ? res.status(422).send({ error }) : next();
};

// Use to catch errors from async functions
const asyncMiddleware = fn => (req, res, next) => {
  Promise
    .resolve(fn(req, res, next))
    .catch((err) => {
      logger.error(err.stack);
      return res.sendStatus(500);
    });
};

module.exports = (app) => {
  const apiV1 = Router();
  app.use('/v1', apiV1);

  apiV1.route('/someroute')
    .get(
      auth.authorize('audience'),
      validateQuery({
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().required(),
        name: Joi.string(),
        arr: Joi.array().items(Joi.string()),
        size: Joi.number().positive().default(1000).max(10000),
      }),
      asyncMiddleware(fooController.show_all),
    );

  // Swagger File
  apiV1.route('/api-docs').get((req, res) => res.send(swagger));

  // HealthCheck
  apiV1.route('/').get((req, res) => res.send({ name, version }));

  // 404
  apiV1.route('*').get((req, res) => res.status(404).send({ success: false, message: 'Not found' }));
};
