import { createSelector } from 'reselect';
import { authInitial, MODULE_STATE_NAME } from './reducer';

const selectAuth = state => state[MODULE_STATE_NAME] || authInitial;

const selectIsAuthorize = () =>
  createSelector(
    selectAuth,
    authState => authState.isAuthenticated,
  );

const selectUser = () =>
  createSelector(
    selectAuth,
    authState => authState.user,
  );

export { selectAuth, selectIsAuthorize, selectUser };
