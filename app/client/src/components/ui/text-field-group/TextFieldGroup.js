import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import './TextFieldGroup.css';

const TextFieldGroup = ({ type, placeholder, name, value, onChange, error, info, classname, disabled }) => {
  return (
    <Fragment>
      <input
        type={type}
        className={`form__control ${classname ? classname : ''} ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form__text text-muted">{info}</small>}
      {error && <div className="invalid__feedback">{error}</div>}
    </Fragment>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};
TextFieldGroup.defaultProps = {
  type: 'text',
};

export default TextFieldGroup;
