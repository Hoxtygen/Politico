//import { check, validationResult } from 'express-validator/check';
const { check, validationResult } = require('express-validator/check');
//import Validator from 'express-validator';

module.exports = {
	login: [
		check('email')
			.isEmpty().withMessage('Email field is required')
			.isEmail().withMessage('Invalid email'),

		check('password').not().isEmpty()
	], 
	errorFormatter: ({location, msg, param, value, nestedErrors}) => {
		return {
			type: 'Error',
			name: 'Signup failure',
			location: location,
			message: msg,
			param: param,
			value: value,
			nestedErrors: nestedErrors
		}
	}
}