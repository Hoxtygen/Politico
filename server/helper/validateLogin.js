// import { check, validationResult } from 'express-validator/check';
// import Validator from 'express-validator';

/* module.exports = {
  login: [
    check('email')
      .not().isEmpty().withMessage('Email field is required')
      .isEmail()
      .withMessage('Invalid email'),

    check('password').not().isEmpty(),
  ],
  newParty: [
    check('name').not().isEmpty(),
    check('Acronym').not().isEmpty(),
    check('hqaddress').not().isEmpty(),
    check('logoUrl').not().isEmpty().isURL(),
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
 */

import Joi from 'joi';
/* const { check, validationResult } = require('express-validator/check');
; */
const validateLogin = (login) => {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.required(),
  };
  return Joi.validate(login, schema);
};

const validateNewUser = (newUser) => {
  const schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    othername: Joi.string().required(),
    email: Joi.string().email().required(),
    phonenumber: Joi.required(),
    passporturl: Joi.required(),
    password: Joi.required(),
  };
  return Joi.validate(newUser, schema);
};

const validateNewOffice = (newOffice) => {
  const schema = {
    name: Joi.string().required(),
    type: Joi.string().required(),
  };
  return Joi.validate(newOffice, schema);
};

const validateNewParty = (newParty) => {
  const schema = {
    name: Joi.string().required(),
    Acronym: Joi.string().required(),
    hqAddress: Joi.string().required(),
    logoUrl: Joi.string().required(),
  };
  return Joi.validate(newParty, schema);
};

const validateVotes = (votes) => {
  const schema = {
    office: Joi.number().required(),
    candidate: Joi.number().required(),
    voter: Joi.number().required(),
  };
  return Joi.validate(votes, schema);
};


const validations = {
  validateLogin,
  validateNewUser,
  validateNewOffice,
  validateNewParty,
  validateVotes,
};

export default validations;
