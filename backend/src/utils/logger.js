const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const config = require('../config/config');

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

// Define log format
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Console format (only in development)
const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''}`
  )
);

// Define transports
const transports = [];

// Console transport (always enabled)
transports.push(
  new winston.transports.Console({
    format: config.nodeEnv === 'production' ? format : consoleFormat,
  })
);

// File transport for errors (production)
if (config.nodeEnv === 'production') {
  transports.push(
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d',
      format,
    })
  );

  transports.push(
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      format,
    })
  );
}

// Create logger
const logger = winston.createLogger({
  level: config.nodeEnv === 'production' ? 'info' : 'debug',
  levels,
  format,
  transports,
  exitOnError: false,
});

// Create stream for Morgan (HTTP logging)
logger.stream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

module.exports = logger;
