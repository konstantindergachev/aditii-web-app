import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { categoriesName, getActionCreator } from '../../helpers';
import { allProductsOfCategoryReceiver } from '../../redux/actions/products-actions';
import { userLogout } from '../../redux/actions/users-actions';
import './Navbar.css';

const Navbar = ({ isAuth, allProductsOfCategory, allProductsOfCategoryReceiver, history, userLogout }) => {
  return (
    <nav className="navbar">
      <ul className="menu__list menu__container">
        <li className="menu__item">
          <NavLink className="menu__link" activeClassName="current" exact to="/">
            home
          </NavLink>
        </li>
        {Object.entries(categoriesName).map(([ key, val ]) => (
          <li className="menu__item" key={key}>
            <NavLink
              className="menu__link"
              activeClassName="current"
              exact
              to={`/${key}`}
              onClick={() => {
                if (!Array.isArray(allProductsOfCategory[key])) {
                  history.push('/');
                  getActionCreator(key, allProductsOfCategoryReceiver);
                }
              }}
            >
              {val}
            </NavLink>
          </li>
        ))}
        <li className="menu__item">
          <NavLink className="menu__link" activeClassName="current" exact to="/contacts">
            contact us
          </NavLink>
        </li>
        {isAuth ? (
          <Fragment>
            <li className="menu__item">
              <NavLink className="menu__link" activeClassName="current" exact to="/history">
                history
              </NavLink>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to="/" onClick={() => userLogout()}>
                logout
              </Link>
            </li>
          </Fragment>
        ) : (
          <li className="menu__item">
            <NavLink className="menu__link" activeClassName="current" exact to="/auth">
              auth
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  allProductsOfCategory: PropTypes.object.isRequired,
  allProductsOfCategoryReceiver: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  userLogout: PropTypes.func.isRequired,
};

export default connect(null, { allProductsOfCategoryReceiver, userLogout })(withRouter(Navbar));
