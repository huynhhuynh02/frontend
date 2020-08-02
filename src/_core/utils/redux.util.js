import produce from 'immer';
import { createSelector } from 'reselect';
import { createAsyncActionType } from './reducerInjectors';
import { DEFAULT_PAGING } from '../../app/constants';

export function createCRUDActionType(module, config) {
  return {
    CREATE: createAsyncActionType(module, 'CREATE'),
    READ: createAsyncActionType(module, 'READ'),
    UPDATE: createAsyncActionType(module, 'UPDATE'),
    DELETE: createAsyncActionType(module, 'DELETE'),
    SEARCH: createAsyncActionType(module, 'SEARCH'),
    ...config,
  };
}

const createCRUDAction = type => ({
  start: payload => ({
    type: type.START,
    payload,
  }),
  success: payload => ({ type: type.SUCCESS, payload }),
  error: error => ({ type: type.ERROR, error }),
});

export function createCRUDActions(module, config) {
  const TYPES = createCRUDActionType(module);

  return {
    create: createCRUDAction(TYPES.CREATE),
    read: createCRUDAction(TYPES.READ),
    update: createCRUDAction(TYPES.UPDATE),
    delete: createCRUDAction(TYPES.DELETE),
    search: createCRUDAction(TYPES.SEARCH),
    ...config,
  };
}

export const createCRUDInitState = ({ search, form }) => ({
  search: {
    ...DEFAULT_PAGING,
    ...search,
  },
  item: { id: 0, ...form },
  rows: [],
  count: 0,
  errors: [],
});

export const createCRUDSelector = (module, { search, form }) => {
  const initState = createCRUDInitState({ search, form });
  const selectState = state => state[module] || initState;
  return {
    state: selectState,
    search: () =>
      createSelector(
        selectState,
        state => state.search,
      ),
    error: () =>
      createSelector(
        selectState,
        state => state.errors,
      ),
    rows: () =>
      createSelector(
        selectState,
        state => state.rows,
      ),
    count: () =>
      createSelector(
        selectState,
        state => state.count,
      ),
  };
};

export const createCRUDReducer = (module, { search, form }) => {
  const initState = createCRUDInitState({ search, form });
  const TYPES = createCRUDActionType(module);

  return (state = initState, action) =>
    produce(state, draft => {
      switch (action.type) {
        case TYPES.READ.SUCCESS:
          draft.item = action.payload;
          break;
        case TYPES.SEARCH.START:
          draft.search = { ...state.search, ...action.payload };
          break;
        case TYPES.SEARCH.SUCCESS:
          draft.rows = action.payload.rows;
          draft.count = action.payload.count;
          break;
        case TYPES.CREATE.SUCCESS:
        case TYPES.DELETE.SUCCESS:
          draft.item = initState.item;
          break;
        case TYPES.CREATE.ERROR:
        case TYPES.SEARCH.ERROR:
        case TYPES.READ.ERROR:
        case TYPES.UPDATE.ERROR:
        case TYPES.DELETE.ERROR:
          draft.errors = action.payload;
          break;
        default:
          break;
      }
    });
};
