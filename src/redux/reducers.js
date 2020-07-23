/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '_core/utils/history';
import languageProviderReducer from 'app/containers/LanguageProvider/reducer';
import { loadingReducer } from 'app/containers/Loading/loading.reducer';
import { reducer as notificationReducer } from 'app/containers/Notification/notification.duck';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    // global: globalReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    loading: loadingReducer,
    notification: notificationReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
