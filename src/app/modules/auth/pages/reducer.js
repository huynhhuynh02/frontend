import produce from 'immer';
import { createActionType } from '../../../../_core/utils/reducerInjectors';

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
        break;
      case AUTH_ACTION_TYPE.LOGOUT:
        draft.token = authInitial.token;
        draft.user = authInitial.user;
        draft.isAuthenticated = false;
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
