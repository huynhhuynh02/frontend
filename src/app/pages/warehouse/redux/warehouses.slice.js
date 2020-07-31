import { createSlice } from '@reduxjs/toolkit';
import { MODULE_STATE_NAME } from 'app/pages/warehouse/constants';

export const initialWarehousesState = {
  warehouseDetail: {},
  warehouseList: {},
  error: '',
};

export const warehouseSlice = createSlice({
  name: MODULE_STATE_NAME,
  initialState: initialWarehousesState,
  reducers: {
    error: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
    },
    warehouseListStart: state => {
      state.error = null;
    },
    warehouseDetailStart: state => {
      state.error = null;
    },
    warehouseCreateStart: state => {
      state.error = null;
    },
    warehouseDeleteStart: state => {
      state.error = null;
    },
    warehouseUpdateStart: state => {
      state.error = null;
    },
    warehouseListFetchedSuccess: (state, action) => {
      state.error = null;
      state.inventoryWarehouseList = action.payload;
    },
    warehouseFetchedSuccess: (state, action) => {
      state.inventoryWarehouseDetail = action.payload;
      state.error = null;
    },
    warehouseCreatedSuccess: state => {
      state.error = null;
      state.inventoryWarehouseDetail =
        initialWarehousesState.inventoryWarehouseDetail;
    },
    warehouseUpdatedSuccess: state => {
      state.error = null;
    },
    warehouseDeletedSuccess: state => {
      state.error = null;
    },
    resetState: state => {
      state.inventoryWarehouseDetail =
        initialWarehousesState.inventoryWarehouseDetail;
      state.inventoryWarehouseList =
        initialWarehousesState.inventoryWarehouseList;
      state.error = initialWarehousesState.error;
    },
  },
});
