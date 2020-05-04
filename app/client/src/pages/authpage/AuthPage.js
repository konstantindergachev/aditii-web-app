import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/ui/button/Button';
import Message from '../../components/ui/message/Message';
import TextFieldGroup from '../../components/ui/text-field-group/TextFieldGroup';
import { userReceiver, userSaver } from '../../redux/actions/users-actions';
import './AuthPage.css';

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkAuth: false,
      name: '',
      lastname: '',
      email: 'tom@tom.com',
      password: 'tomtom',
      confirmPassword: '',
      errors: {},
      info: '',
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.info) {
      return {
        info: props.info,
      };
    }
    if (state.info) {
      return {
        info: props.info,
      };
    }
    // if (props.auth.isAuthenticated) props.history.push('/dashboard');
    // if (props.errors) return { errors: props.errors };
    return null;
  }
  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard');
    // }
  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };
  handleSubmit = (ev) => {
    ev.preventDefault();
    const { checkAuth } = this.state;
    const { userSaver, userReceiver, history } = this.props;
    if (checkAuth) {
      const userData = {
        name: this.state.name,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      };
      userSaver(userData);
      this.setState((oldState) => ({
        checkAuth: !oldState.checkAuth,
      }));
    } else {
      const userData = {
        email: this.state.email,
        password: this.state.password,
      };
      userReceiver(userData, history);
    }
  };
  checkToSignUp = () => {
    this.setState((oldState) => ({
      checkAuth: !oldState.checkAuth,
    }));
  };
  render() {
    const { checkAuth, info, errors } = this.state;
    return (
      <section className="auth">
        {info && <Message msg={info} classname="auth__info" />}
        <form onSubmit={this.handleSubmit} className="auth__form">
          <h1 className="auth__title">
            <span>{checkAuth ? 'Sign up' : 'Log in'}</span>
            <button type="button" onClick={this.checkToSignUp} className="auth__check-to-sign-up">
              {checkAuth ? 'Check to log in' : 'Check to sign up'}
            </button>
          </h1>
          {checkAuth && (
            <Fragment>
              <TextFieldGroup placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange} error={errors.name} />
              <TextFieldGroup
                placeholder="Lastname"
                name="lastname"
                value={this.state.lastname}
                onChange={this.handleChange}
                error={errors.lastname}
              />
            </Fragment>
          )}
          <TextFieldGroup
            type="email"
            placeholder="Email Address"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            error={errors.email}
          />
          <TextFieldGroup
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          {checkAuth && (
            <TextFieldGroup
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              error={errors.confirmPassword}
            />
          )}
          <Button type="submit" text={checkAuth ? 'Sign up' : 'Log in'} classname="auth__btn" />
        </form>
      </section>
    );
  }
}

AuthPage.protoTypes = {
  info: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  userReceiver: PropTypes.func.isRequired,
  userSaver: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  info: state.users.info,
});

export default connect(mapStateToProps, { userReceiver, userSaver })(AuthPage);
