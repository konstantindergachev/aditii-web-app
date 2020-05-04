import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { categoriesName, getActionCreator } from '../../../helpers';
import { allProductsOfCategoryReceiver } from '../../../redux/actions/products-actions';
import { userLogout } from '../../../redux/actions/users-actions';
import './Mobibar.css';

class Mobibar extends React.Component {
  state = {
    isOpen: false,
  };

  handleMobiMenuOpen = () => {
    this.setState((oldState) => ({
      isOpen: !oldState.isOpen,
    }));
  };

  render() {
    const { isOpen } = this.state;
    const { isAuth, allProductsOfCategory, history, allProductsOfCategoryReceiver, userLogout } = this.props;
    const allProductsOfCategoryName = Object.keys(allProductsOfCategory).map((key) => key);
    return (
      <div className={`mobibar__wrap ${isOpen && 'mobibar__wrap-open'}`}>
        <Link
          to="#"
          className={`mobibar__hamburger ${isOpen ? 'mobibar__hamburger-opened' : 'mobibar__hamburger-closed'}`}
          onClick={this.handleMobiMenuOpen}
        />
        {isOpen && (
          <ul className="mobibar">
            <li>
              <NavLink to="/" exact activeClassName="current" className="mobibar__link" onClick={this.handleMobiMenuOpen}>
                home
              </NavLink>
            </li>
            {Object.entries(categoriesName).map(([ key, val ]) => (
              <li key={key}>
                <NavLink
                  className="mobibar__link"
                  activeClassName="current"
                  exact
                  to={`/${key}`}
                  onClick={() => {
                    if (allProductsOfCategoryName.length > 1 || !allProductsOfCategoryName.includes(key)) {
                      history.push('/');
                      getActionCreator(key, allProductsOfCategoryReceiver);
                      this.handleMobiMenuOpen();
                    }
                  }}
                >
                  {val}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink className="mobibar__link" activeClassName="current" exact to="/contacts" onClick={this.handleMobiMenuOpen}>
                contact us
              </NavLink>
            </li>
            {isAuth ? (
              <Fragment>
                <li>
                  <NavLink className="mobibar__link" activeClassName="current" exact to="/history" onClick={this.handleMobiMenuOpen}>
                    history
                  </NavLink>
                </li>
                <li>
                  <Link
                    className="mobibar__link"
                    to="/"
                    onClick={() => {
                      userLogout();
                      this.handleMobiMenuOpen();
                    }}
                  >
                    logout
                  </Link>
                </li>
              </Fragment>
            ) : (
              <li>
                <NavLink className="mobibar__link" activeClassName="current" exact to="/auth" onClick={this.handleMobiMenuOpen}>
                  auth
                </NavLink>
              </li>
            )}
          </ul>
        )}
      </div>
    );
  }
}

Mobibar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  allProductsOfCategory: PropTypes.object.isRequired,
  allProductsOfCategoryReceiver: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  userLogout: PropTypes.func.isRequired,
};

export default connect(null, { allProductsOfCategoryReceiver, userLogout })(withRouter(Mobibar));
