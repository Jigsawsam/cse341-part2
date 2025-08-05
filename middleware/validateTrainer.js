const { body, validationResult } = require('express-validator');

const trainerValidationRules = [
  body('name')
    .isString()
    .notEmpty()
    .withMessage('Name is required and must be a string'),
    
  body('age')
    .isInt({ min: 1 })
    .withMessage('Age must be a positive integer')
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
  trainerValidationRules,
  validate
};
