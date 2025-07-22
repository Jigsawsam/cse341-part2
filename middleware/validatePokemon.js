const { body, validationResult } = require('express-validator');

const pokemonValidationRules = [
  body('name').isString().notEmpty().withMessage('Name is required and must be a string'),
  body('type').isString().notEmpty().withMessage('Type is required and must be a string'),
  body('level').isInt().withMessage('Level must be an integer'),
  body('hp').isInt().withMessage('HP must be an integer'),
  body('attack').isInt().withMessage('Attack must be an integer'),
  body('defense').isInt().withMessage('Defense must be an integer'),
  body('moves').isArray({ min: 1 }).withMessage('Moves must be a non-empty array of strings'),
  body('moves.*').isString().withMessage('Each move must be a string')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  pokemonValidationRules,
  validate
};
