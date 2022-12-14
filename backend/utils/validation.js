const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errorObj = {};
    const errors = validationErrors
      .array()
      .forEach((error) => {
        let key = error.param;
        errorObj[key] = error.msg;
      });

    const err = Error('Validation Error');
    err.errors = errorObj;
    err.statusCode = 400;
    res.status(400)
    next(err);
  }
  next();
};

const handleAddSongToAlbum = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errorObj= {};

    const errors = validationErrors.array().forEach((error) => {
      let key = error.param;
      errorObj[key] = error.msg;
    });

    const err = Error("Validation Error");
    err.message = "Validation Error"
    err.statusCode = 400;
    err.errors = errorObj;
    res.status(400)
    return res.json({message: err.message, ...err});
  }
  next();
};

module.exports = {
  handleValidationErrors,
  handleAddSongToAlbum
};
