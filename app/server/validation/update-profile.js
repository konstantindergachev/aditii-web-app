const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatorUpdateProfileInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 simbols';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = 'Lastname must be between 2 and 30 simbols';
  }
  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = 'Lastname field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is incorrect. Try again.';
  }

  return { errors, isValid: isEmpty(errors) };
};
