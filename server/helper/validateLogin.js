import Joi from 'joi';

const validateLogin = (login) => {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.required(),
  };
  return Joi.validate(login, schema, { abortEarly: false });
};

const validateNewUser = (newUser) => {
  const schema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    othername: Joi.string().required(),
    email: Joi.string().email().required(),
    phonenumber: Joi.required(),
    passporturl: Joi.required(),
    password: Joi.required(),
    isadmin: Joi.boolean(),
  });
  return Joi.validate(newUser, schema, { abortEarly: false });
};

const validateNewOffice = (newOffice) => {
  const schema = {
    name: Joi.string().required(),
    type: Joi.string().required(),
  };
  return Joi.validate(newOffice, schema, { abortEarly: false });
};

const validateGetOneOffice = (oneOffice) => {
  const schema = {
    id: Joi.number().integer().required(),
  };
  return Joi.validate(oneOffice, schema, { abortEarly: false });
};

const validateNewParty = (newParty) => {
  const schema = {
    name: Joi.string().required(),
    Acronym: Joi.string().required(),
    hqAddress: Joi.string().required(),
    logoUrl: Joi.string().required(),
  };
  return Joi.validate(newParty, schema, { abortEarly: false });
};

const validateVotes = (votes) => {
  const schema = {
    office: Joi.required(),
    candidate: Joi.required(),
    voter: Joi.required(),
  };
  return Joi.validate(votes, schema, { abortEarly: false });
};

const validateCandidateRegistration = (candidate) => {
  const schema = {
    candidate: Joi.number().integer().required(),
    office: Joi.number().integer().required(),
  };
  return Joi.validate(candidate, schema, { abortEarly: false });
};

const validateResult = (office) => {
  const schema = {
    office: Joi.number().required(),
  };
  return Joi.validate(office, schema, { abortEarly: false });
};

const validateEditParty = (id, name) => {
  const partyInfo = {
    id,
    name,
  };
  const schema = {
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
  };
  return Joi.validate(partyInfo, schema, { abortEarly: false });
};


const validations = {
  validateLogin,
  validateNewUser,
  validateNewOffice,
  validateGetOneOffice,
  validateNewParty,
  validateEditParty,
  validateVotes,
  validateCandidateRegistration,
  validateResult,
};

export default validations;
