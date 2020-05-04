import { TYPES } from '../types/types';

export const userSaver = (user) => {
  return {
    type: TYPES.USER_REGISTER,
    payload: user,
  };
};

export const userReceiver = (user, history) => {
  history.push('/');
  return {
    type: TYPES.USER_LOGIN,
    payload: user,
  };
};

export const userLogout = () => {
  return {
    type: TYPES.USER_LOGOUT,
  };
};

export const userReLogin = (user, token) => {
  return {
    type: TYPES.USER_RELOGIN,
    payload: { user, token },
  };
};
