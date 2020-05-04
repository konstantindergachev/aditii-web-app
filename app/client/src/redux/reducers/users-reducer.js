import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../../helpers';
import { TYPES } from '../types/types';

const initialState = {
  user: {},
  info: '',
  token: '',
  error: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.USER_REGISTER_ASYNC:
      return {
        ...state,
        user: action.payload.savedUser,
        info: action.payload.info,
      };
    case TYPES.USER_LOGIN_ASYNC:
      let decoded = {};
      let token = '';
      if (action.payload.hasOwnProperty('token')) {
        token = action.payload.token;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        decoded = jwt_decode(token);
      }
      return {
        ...state,
        user: decoded,
        info: '',
        token,
      };
    case TYPES.USER_RELOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case TYPES.USER_LOGOUT:
      localStorage.removeItem('jwtToken');
      return {
        ...state,
        user: {},
        token: '',
      };
    case TYPES.USER_LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case TYPES.USER_REGISTER_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
