import {
  createCRUDActions,
  createCRUDActionType,
  createCRUDReducer,
  createCRUDSelector,
} from '../../../_core/utils/redux.util';

export const COST_MODULE_NAME = 'COST';

export const ACTION_TYPES = createCRUDActionType(COST_MODULE_NAME);

export const actions = createCRUDActions(COST_MODULE_NAME);

export const reducer = createCRUDReducer(COST_MODULE_NAME, {
  search: {},
  form: {},
});

export const selectors = createCRUDSelector(COST_MODULE_NAME, {
  search: {},
  form: {},
});
