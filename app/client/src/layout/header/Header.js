import PropTypes from 'prop-types';
import React from 'react';
import BasketIcon from '../../components/basket-icon/BasketIcon';
import Logo from '../../components/logo/Logo';
import './Header.css';
import Mobibar from './mobibar/Mobibar';

const Header = ({ allProductsOfCategory, isAuth, username, cartLength }) => {
  return (
    <header className="header">
      <div className="header__container">
        <Mobibar isAuth={isAuth} allProductsOfCategory={allProductsOfCategory} />
        <Logo />
        <BasketIcon isAuth={isAuth} username={username} cartLength={cartLength} />
      </div>
    </header>
  );
};

Header.propTypes = {
  allProductsOfCategory: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  cartLength: PropTypes.number.isRequired,
};

export default Header;
