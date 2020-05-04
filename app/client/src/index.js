import jwtDecode from 'jwt-decode';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { setAuthToken } from './helpers';
import './index.css';
import { userLogout, userReLogin } from './redux/actions/users-actions';
import store from './store';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(userReLogin(decoded, token));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(userLogout());
    window.location.href = '/auth';
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
