import { call, put, takeLatest } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import crud from 'app/pages/product/redux/product.crud';
import { showNotification } from 'app/containers/Notification/notification.duck';
import { MODULE_STATE_NAME } from 'app/pages/product/constants';
import {
  initialProductState,
  productSlice,
} from 'app/pages/product/redux/product.slice';

export const { reducer, actions } = productSlice;

export function toModel(values) {
  return { ...values };
}

export function* saga() {
  yield takeLatest(actions.productDetailStart.type, function* getByIdSaga(
    action,
  ) {
    try {
      const data = yield call(crud.read, action.payload);
      yield put(actions.productFetchedSuccess(data));
    } catch (error) {
      yield put(
        showNotification('error', {
          message: 'Get Product Error',
        }),
      );
      yield put(actions.error({ error }));
    }
  });

  yield takeLatest(actions.productCreateStart.type, function* createProductSaga(
    action,
  ) {
    try {
      const data = yield call(crud.create, toModel(action.payload.data));
      yield put(actions.productCreatedSuccess(data));
      action.payload.callback && action.payload.callback();
      yield put(
        showNotification('success', {
          message: 'Create Product Success',
        }),
      );
    } catch (error) {
      yield put(
        showNotification('error', {
          message: 'Create Product Error',
        }),
      );
      yield put(actions.error({ error }));
    }
  });

  yield takeLatest(actions.productUpdateStart.type, function* updateProductSaga(
    action,
  ) {
    try {
      const data = yield call(
        crud.update,
        action.payload.data.id,
        toModel(action.payload.data),
      );
      yield put(actions.productUpdatedSuccess(data));
      yield put(
        showNotification('success', {
          message: 'Update Product Success',
        }),
      );

      action.payload.callback && action.payload.callback();
    } catch (error) {
      console.error(error);
      yield put(
        showNotification('error', {
          message: 'Update Product Error',
        }),
      );
      yield put(actions.error({ error }));
    }
  });

  yield takeLatest(actions.productDeleteStart, function* deleteProductSaga(
    action,
  ) {
    try {
      yield call(crud.remove, action.payload.id);
      yield put(actions.productDeletedSuccess(action.payload));
      action.payload.callback && action.payload.callback();
      yield put(
        showNotification('success', {
          message: 'Delete Product Success',
        }),
      );
    } catch (error) {
      console.error(error);
      yield put(
        showNotification('error', {
          message: 'Delete Product Error',
        }),
      );
      yield put(actions.error({ error }));
    }
  });

  yield takeLatest(actions.productListStart, function* filterProductSaga(
    action,
  ) {
    try {
      const data = yield call(crud.search, action.payload);
      yield put(actions.productListFetchedSuccess(data));
    } catch (error) {
      console.error(error);
      yield put(
        showNotification('error', {
          message: 'Filter Product Error',
        }),
      );
      yield put(actions.error({ error }));
    }
  });
}

const selectProductState = state =>
  state[MODULE_STATE_NAME] || initialProductState;

export const makeSelectProductDetail = () =>
  createSelector(
    selectProductState,
    (state = {}) => {
      const { productDetail = {} } = state;
      return {
        ...productDetail,
      };
    },
  );

export const makeSelectProductList = () =>
  createSelector(
    selectProductState,
    (state = {}) => ({
      ...state.productList,
      rows: state.productList.rows || [],
    }),
  );
