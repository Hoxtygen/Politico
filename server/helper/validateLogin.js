// import { check, validationResult } from 'express-validator/check';
const { check, validationResult } = require('express-validator/check');
// import Validator from 'express-validator';

module.exports = {
  login: [
    check('email')
      .not().isEmpty().withMessage('Email field is required')
      .isEmail()
      .withMessage('Invalid email'),

    check('password').not().isEmpty(),
  ],
  errorFormatter: ({
    location, msg, param, value, nestedErrors,
  }) => ({
    type: 'Error',
    name: 'Signup failure',
    location,
    message: msg,
    param,
    value,
    nestedErrors,
  }),
};
