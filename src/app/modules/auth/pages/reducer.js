import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { createActionType } from '../../../../_core/utils/reducerInjectors';
import {
  LOCAL_STORAGE,
  remove,
  save,
} from '../../../../_core/utils/localStorage';
export const MODULE_STATE_NAME = 'AUTH';

const AUTH_ACTION_TYPE = {
  LOGIN: createActionType(MODULE_STATE_NAME, 'LOGIN'),
  LOGOUT: createActionType(MODULE_STATE_NAME, 'LOGOUT'),
};

export const authInitial = {
  isAuthenticated: false,
  token: '',
  user: null,
};

export const reducer = (state = authInitial, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTH_ACTION_TYPE.LOGIN:
        draft.token = action.payload.token;
        draft.user = action.payload.user;
        draft.isAuthenticated = true;
        save(LOCAL_STORAGE.TOKEN, action.payload.token);

        break;
      case AUTH_ACTION_TYPE.LOGOUT:
        draft.token = authInitial.token;
        draft.user = authInitial.user;
        draft.isAuthenticated = false;
        remove(LOCAL_STORAGE.TOKEN);
        break;
      default:
        break;
    }
  });

export function login(token, user) {
  return {
    type: AUTH_ACTION_TYPE.LOGIN,
    payload: {
      token,
      user,
    },
  };
}

export function logout() {
  return {
    type: AUTH_ACTION_TYPE.LOGOUT,
    payload: authInitial,
  };
}

export function* saga() {
  yield takeLatest(AUTH_ACTION_TYPE.LOGIN, function* redirectToDashboard() {
    yield put(push('/dashboard'));
  });
  yield takeLatest(AUTH_ACTION_TYPE.LOGOUT, function* redirectToDashboard() {
    yield put(push('/'));
  });
}
