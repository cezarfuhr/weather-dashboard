const Joi = require('joi');
const logger = require('../utils/logger');

/**
 * Middleware factory for request validation
 * @param {Object} schema - Joi schema object with query, params, body
 * @returns {Function} Express middleware
 */
const validate = (schema) => {
  return (req, res, next) => {
    const validationOptions = {
      abortEarly: false, // Include all errors
      allowUnknown: true, // Ignore unknown props
      stripUnknown: true, // Remove unknown props
    };

    const toValidate = {};
    if (schema.query) toValidate.query = req.query;
    if (schema.params) toValidate.params = req.params;
    if (schema.body) toValidate.body = req.body;

    const { error, value } = Joi.object(schema).validate(toValidate, validationOptions);

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      logger.warn('Validation error', {
        path: req.path,
        method: req.method,
        errors
      });

      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation error',
          details: errors,
        },
      });
    }

    // Replace req values with validated values
    if (value.query) req.query = value.query;
    if (value.params) req.params = value.params;
    if (value.body) req.body = value.body;

    next();
  };
};

// Common validation schemas
const schemas = {
  coordinates: Joi.object({
    lat: Joi.number().min(-90).max(90).required().messages({
      'number.base': 'Latitude must be a number',
      'number.min': 'Latitude must be between -90 and 90',
      'number.max': 'Latitude must be between -90 and 90',
      'any.required': 'Latitude is required',
    }),
    lon: Joi.number().min(-180).max(180).required().messages({
      'number.base': 'Longitude must be a number',
      'number.min': 'Longitude must be between -180 and 180',
      'number.max': 'Longitude must be between -180 and 180',
      'any.required': 'Longitude is required',
    }),
  }),

  city: Joi.object({
    city: Joi.string().min(1).max(100).required().messages({
      'string.base': 'City must be a string',
      'string.min': 'City name cannot be empty',
      'string.max': 'City name too long',
      'any.required': 'City is required',
    }),
  }),

  days: Joi.object({
    days: Joi.number().integer().min(1).max(16).default(10).messages({
      'number.base': 'Days must be a number',
      'number.min': 'Days must be at least 1',
      'number.max': 'Days cannot exceed 16',
    }),
  }),

  timestamp: Joi.object({
    timestamp: Joi.number().integer().positive().required().messages({
      'number.base': 'Timestamp must be a number',
      'number.positive': 'Timestamp must be positive',
      'any.required': 'Timestamp is required',
    }),
  }),
};

module.exports = {
  validate,
  schemas,
};
