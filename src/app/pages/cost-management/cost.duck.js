import {
  createCRUDActions,
  createCRUDActionType,
  createCRUDReducer,
  createCRUDSelector,
} from '../../../_core/utils/redux.util';

export const MODULE_NAME = 'COST';

export const ACTION_TYPES = createCRUDActionType(MODULE_NAME);

export const actions = createCRUDActions(MODULE_NAME);

export const reduce = createCRUDReducer(MODULE_NAME, {
  search: {},
  form: {},
});

export const selectors = createCRUDSelector(MODULE_NAME, {
  search: {},
  form: {},
});
