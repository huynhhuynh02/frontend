/*
*
- actions types
- actions
- saga
- reducer
- crud
- selector
* */
import { call, put, takeLatest } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import * as crud from 'app/pages/warehouse/redux/warehouse.crud';
import { showNotification } from 'app/containers/Notification/notification.duck';
import { MODULE_STATE_NAME } from 'app/pages/warehouse/constants';
import {
  initialWarehousesState,
  warehouseSlice,
} from 'app/pages/warehouse/redux/warehouses.slice';

export const { reducer, actions } = warehouseSlice;

export function toModel(values) {
  return { ...values };
}

export function* saga() {
  yield takeLatest(actions.warehouseDetailStart.type, function* getByIdSaga(
    action,
  ) {
    try {
      const data = yield call(crud.get, action.payload);
      yield put(actions.warehouseFetchedSuccess(data));
    } catch (error) {
      yield put(
        showNotification('error', {
          message: 'Get Warehouse Error',
        }),
      );
      yield put(actions.error({ error }));
    }
  });

  yield takeLatest(
    actions.warehouseCreateStart.type,
    function* createWarehouseSaga(action) {
      try {
        const data = yield call(crud.create, toModel(action.payload));
        yield put(actions.warehouseCreatedSuccess(data));
        action.callback && action.callback();
        yield put(
          showNotification('success', {
            message: 'Create Warehouse Success',
          }),
        );
      } catch (error) {
        yield put(
          showNotification('error', {
            message: 'Create Warehouse Error',
          }),
        );
        yield put(actions.error({ error }));
      }
    },
  );

  yield takeLatest(
    actions.warehouseUpdateStart.type,
    function* updateWarehouseSaga(action) {
      try {
        const data = yield call(
          crud.update,
          action.payload.id,
          toModel(action.payload),
        );
        yield put(actions.warehouseUpdatedSuccess(data));
        yield put(
          showNotification('success', {
            message: 'Update Warehouse Success',
          }),
        );

        action.callback && action.callback();
      } catch (error) {
        console.error(error);
        yield put(
          showNotification('error', {
            message: 'Update Warehouse Error',
          }),
        );
        yield put(actions.error({ error }));
      }
    },
  );

  yield takeLatest(actions.warehouseDeleteStart, function* deleteWarehouseSaga(
    action,
  ) {
    try {
      yield call(crud.remove, action.payload.id);
      yield put(actions.remove.success(action.payload));
      action.callback && action.callback();
      yield put(
        showNotification('success', {
          message: 'Delete Warehouse Success',
        }),
      );
    } catch (error) {
      console.error(error);
      yield put(
        showNotification('error', {
          message: 'Delete Warehouse Error',
        }),
      );
      yield put(actions.remove.error({ error }));
    }
  });

  yield takeLatest(actions.warehouseListStart, function* filterWarehouseSaga(
    action,
  ) {
    try {
      const data = yield call(crud.filter, action.payload);
      yield put(actions.warehouseListFetchedSuccess(data));
    } catch (error) {
      yield put(
        showNotification('error', {
          message: 'Filter Warehouse Error',
        }),
      );
      yield put(actions.error({ error }));
    }
  });
}

const selectWarehouseListState = state =>
  state[MODULE_STATE_NAME] || initialWarehousesState;

export const makeSelectWarehouseDetail = createSelector(
  selectWarehouseListState,
  (state = {}) => {
    const { warehouseDetail = {} } = state;
    return {
      ...warehouseDetail,
    };
  },
);

export const makeSelectWarehouseList = createSelector(
  selectWarehouseListState,
  (state = {}) => ({
    ...state.warehouseList,
    results: state.warehouseList.results || [],
  }),
);
