const { createLogger, format, transports } = require('winston');
const { name } = require('../../package.json');
require('winston-daily-rotate-file');

const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
const LOG_PATH = process.env.LOG_PATH || './logs';

const transportConsole = new transports.Console({
  level: LOG_LEVEL,
  silent: (process.env.NODE_ENV === 'test'),
});

const transportDailyRotateFile = new transports.DailyRotateFile({
  filename: `${LOG_PATH}/${name}-%DATE%.log`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: LOG_LEVEL,
});

const myTransports = [transportConsole];
if (process.env.NODE_ENV !== 'test') myTransports.push(transportDailyRotateFile);

const timestampFormatHHMMSSmm = (timestamp) => timestamp.split('T')[1].split('Z')[0];

const myFormat = format.combine(
  format.timestamp(),
  format.printf(({ timestamp, level, message }) => `[${(timestampFormatHHMMSSmm(timestamp))}][${level.toUpperCase()}]: ${message}`),
);
const logger = createLogger({
  format: myFormat,
  transports: myTransports,
});

module.exports = logger;
