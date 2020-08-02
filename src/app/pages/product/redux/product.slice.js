import { createSlice } from '@reduxjs/toolkit';
import { MODULE_STATE_NAME } from 'app/pages/product/constants';

export const initialProductState = {
  productDetail: {},
  productList: {},
  error: '',
};

export const productSlice = createSlice({
  name: MODULE_STATE_NAME,
  initialState: initialProductState,
  reducers: {
    error: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
    },
    productListStart: state => {
      state.error = null;
    },
    productDetailStart: state => {
      state.error = null;
    },
    productCreateStart: state => {
      state.error = null;
    },
    productDeleteStart: state => {
      state.error = null;
    },
    productUpdateStart: state => {
      state.error = null;
    },
    productListSuccess: (state, action) => {
      state.error = null;
      state.productList = action.payload;
    },
    productDetailSuccess: (state, action) => {
      state.productDetail = action.payload;
      state.error = null;
    },
    productCreateSuccess: state => {
      state.error = null;
      state.productDetail = initialProductState.productDetail;
    },
    productUpdateSuccess: state => {
      state.error = null;
    },
    productDeleteSuccess: state => {
      state.error = null;
    },
    resetState: state => {
      state.productDetail = initialProductState.productDetail;
      state.productList = initialProductState.productList;
      state.error = initialProductState.error;
    },
  },
});
