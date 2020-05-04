import PropTypes from 'prop-types';
import React from 'react';
import './Message.css';

const Message = ({ msg, classname }) => <span className={`msg ${classname}`}>{msg}</span>;

Message.propTypes = {
  msg: PropTypes.string.isRequired,
  classname: PropTypes.string.isRequired,
};

export default Message;
