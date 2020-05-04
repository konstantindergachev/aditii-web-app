const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  // console.log('data: ', data);
  data.name = !isEmpty(data.name) ? data.name : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 to 30 symbols';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }
  if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = 'Lastname must be between 2 and 30 symbols';
  }
  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = 'Lastname is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is not correct';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 symbols';
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm password is required';
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords is not equal';
  }
  return { errors, isValid: isEmpty(errors) };
};
