import produce from 'immer';
import { createSelector } from 'reselect';
import { createActionType } from '../../../_core/utils/reducerInjectors';

export const MODULE_STATE_NAME = 'SPLASHSCREEN';

const SPLASH_SCREEN_ACTION_TYPE = {
  INIT: createActionType(MODULE_STATE_NAME, 'INIT'),
};

export const splashScreenInitial = {
  isInit: false,
};

export const reducer = (state = splashScreenInitial, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SPLASH_SCREEN_ACTION_TYPE.INIT:
        draft.isInit = true;
        break;
      default:
        break;
    }
  });

export function setInit() {
  return {
    type: SPLASH_SCREEN_ACTION_TYPE.INIT,
  };
}

export const selectIsInit = () =>
  createSelector(
    state => state[MODULE_STATE_NAME] || splashScreenInitial,
    splashScreenState => splashScreenState.isInit,
  );
