import React from 'react';
import { CrownOutlined, SmileOutlined } from '@ant-design/icons';
import { WAREHOUSE_MENU } from 'app/pages/warehouse';
import { PRODUCT_MENU } from 'app/pages/product';

export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: <SmileOutlined />,
  },
  {
    path: '/inventory',
    name: 'Inventory',
    icon: <CrownOutlined />,
    routes: [
      {
        path: '/inventory/summary',
        name: 'Summary',
        icon: <CrownOutlined />,
      },
      {
        path: '/inventory/sub-page2',
        name: 'Sub 3',
        icon: <CrownOutlined />,
        component: './Welcome',
      },
    ],
  },
  WAREHOUSE_MENU,
  PRODUCT_MENU,
  {
    path: '/cost',
    name: 'Cost Management',
    icon: <SmileOutlined />,
  },
];
