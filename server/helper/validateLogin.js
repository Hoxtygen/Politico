import Joi from 'joi';

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
    office: Joi.required(),
    candidate: Joi.required(),
    voter: Joi.required(),
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
