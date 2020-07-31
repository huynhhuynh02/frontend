import loadable from '_core/utils/loadable';
import { useInjectReducer } from '_core/utils/injectReducer';
import { MODULE_STATE_NAME } from 'app/pages/warehouse/constants';
import { reducer, saga } from 'app/pages/warehouse/redux/warehouse.duck';
import { useInjectSaga } from '_core/utils/injectSaga';
import React from 'react';
import { CrownOutlined } from '@ant-design/icons';

export const WAREHOUSE_ROOT_PATH = '/warehouse';

export const WAREHOUSE_MENU = {
  path: `${WAREHOUSE_ROOT_PATH}/list`,
  name: 'Warehouse',
  icon: <CrownOutlined />,
};

const WarehousePageLazy = loadable(() =>
  import('app/pages/warehouse/WarehousePage'),
);

function WarehousePage(props) {
  useInjectReducer({ key: MODULE_STATE_NAME, reducer });
  useInjectSaga({ key: MODULE_STATE_NAME, saga });
  return <WarehousePageLazy {...props} />;
}

export default WarehousePage;
