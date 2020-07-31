import { call, put, takeLatest } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import * as crud from 'app/pages/product/redux/product.crud';
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
      const data = yield call(crud.get, action.payload);
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
      const data = yield call(crud.create, toModel(action.payload));
      yield put(actions.productCreatedSuccess(data));
      action.callback && action.callback();
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
        action.payload.id,
        toModel(action.payload),
      );
      yield put(actions.productUpdatedSuccess(data));
      yield put(
        showNotification('success', {
          message: 'Update Product Success',
        }),
      );

      action.callback && action.callback();
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
      yield put(actions.remove.success(action.payload));
      action.callback && action.callback();
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
      yield put(actions.remove.error({ error }));
    }
  });

  yield takeLatest(actions.productListStart, function* filterProductSaga(
    action,
  ) {
    try {
      const data = yield call(crud.filter, action.payload);
      yield put(actions.productListFetchedSuccess(data));
    } catch (error) {
      yield put(
        showNotification('error', {
          message: 'Filter Product Error',
        }),
      );
      yield put(actions.error({ error }));
    }
  });
}

const selectProductListState = state =>
  state[MODULE_STATE_NAME] || initialProductState;

export const makeSelectProductDetail = createSelector(
  selectProductListState,
  (state = {}) => {
    const { productDetail = {} } = state;
    return {
      ...productDetail,
    };
  },
);

export const makeSelectProductList = createSelector(
  selectProductListState,
  (state = {}) => ({
    ...state.productList,
    results: state.productList.results || [],
  }),
);
