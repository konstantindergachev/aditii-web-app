import { call, put } from 'redux-saga/effects';
import api from '../../api';
import { TYPES } from '../types/types';

export function* saveNewUserToDB(payload) {
  try {
    const userFromDB = yield call(api.users.createUser, payload);
    yield put({ type: TYPES.USER_REGISTER_ASYNC, payload: userFromDB });
  } catch (err) {
    yield put({ type: TYPES.USER_REGISTER_ERROR, error: err.message });
  }
}

export function* receiveUserFromDB(payload) {
  try {
    const userFromDB = yield call(api.users.fetchUser, payload);
    yield put({ type: TYPES.USER_LOGIN_ASYNC, payload: userFromDB });
  } catch (err) {
    yield put({ type: TYPES.USER_LOGIN_ERROR, error: err.message });
  }
}
