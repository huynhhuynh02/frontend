import loadable from '_core/utils/loadable';
import { useInjectReducer } from '_core/utils/injectReducer';
import { MODULE_STATE_NAME } from 'app/pages/inventory/warehouses/constants';
import {
  reducer,
  saga,
} from 'app/pages/inventory/warehouses/redux/inventory-warehouses.duck';
import { useInjectSaga } from '_core/utils/injectSaga';
import React from 'react';

const InventoryWarehousePageLazy = loadable(() =>
  import('app/pages/inventory/warehouses/InventoryWarehousesPage'),
);

function InventoryWarehousePage(props) {
  useInjectReducer({ key: MODULE_STATE_NAME, reducer });
  useInjectSaga({ key: MODULE_STATE_NAME, saga });
  return <InventoryWarehousePageLazy {...props} />;
}

export default InventoryWarehousePage;
