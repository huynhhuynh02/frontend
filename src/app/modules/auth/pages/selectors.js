import { createSelector } from 'reselect';
import * as _ from 'lodash';

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

const selectIsHasAnyPermission = items =>
  createSelector(
    selectAuth,
    authState => {
      let rs = false;
      if (authState && authState.user) {
        const { permissions } = authState.user;
        if (permissions) {
          if (_.isArray(items)) {
            for (let i = 0; i < items.length; i += 1) {
              if (
                permissions[`action${items[i]}`] &&
                permissions[`action${items[i]}`].type > 0
              ) {
                rs = true;
                break;
              }
            }
          } else {
            rs = permissions[`action${items}`].type > 0;
          }
        }
      }
      return rs;
    },
  );

export { selectAuth, selectIsAuthorize, selectUser, selectIsHasAnyPermission };
