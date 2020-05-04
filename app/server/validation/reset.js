const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateResetInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : '';
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is necessarily';
  }
  if (data.email !== '') {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is wrong';
    }
  }

  if (Validator.isEmpty(data.oldPassword)) {
    errors.oldPassword = 'Set an old password';
  }
  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = 'Set a new password';
  }

  if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.newPasswordLength =
      'The length a new password must be at least 6 characters';
  }
  if (data.oldPassword !== '' && data.newPassword !== '') {
    if (Validator.equals(data.oldPassword, data.newPassword)) {
      errors.oldPassword = 'Passwords are equal. Check a new password';
    }
  }

  return { errors, isValid: isEmpty(errors) };
};
