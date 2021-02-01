const ValidationError = require('../errors/validation');
const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  try {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    next();
  } catch (err) {
    next(err, req, res);
  }

}