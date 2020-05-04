import PropTypes from 'prop-types';
import React from 'react';
import './Button.css';

const Button = ({ type, text, classname, eventHandler }) => {
  switch (classname) {
    case 'main__btn':
      return (
        <button type={type} className={`${classname} btn`}>
          {text}
        </button>
      );
    case 'category__btn':
      return (
        <button type={type} className={`${classname} btn`}>
          {text}
        </button>
      );
    case 'auth__btn':
      return <input type={type} className={`${classname} btn`} value={text} />;
    case 'buy__btn':
      return (
        <button type={type} className={`${classname} btn`} onClick={eventHandler}>
          {text}
        </button>
      );
    case 'clear__btn':
      return (
        <button type={type} className={`${classname} btn`} onClick={eventHandler}>
          {text}
        </button>
      );
    default:
      return (
        <button type={type} className={`${classname}`}>
          'default button'
        </button>
      );
  }
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  classname: PropTypes.string.isRequired,
  eventHandler: PropTypes.func,
};

export default Button;
