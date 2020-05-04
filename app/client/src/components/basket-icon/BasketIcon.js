import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import basket from '../../img/icons/basket.svg';
import './BasketIcon.css';

const BasketIcon = ({ isAuth, username, cartLength }) => {
  return (
    <Link to="/cart" className="basket__wrap">
      {isAuth && <span className="username">{username}</span>}
      <img src={basket} alt="basket" />
      {isAuth && <span className="basket__count">{cartLength}</span>}
    </Link>
  );
};

BasketIcon.prototype = {
  isAuth: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  cartLength: PropTypes.number.isRequired,
};

export default BasketIcon;
