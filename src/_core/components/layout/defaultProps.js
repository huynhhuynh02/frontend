import React from 'react';
import { SmileOutlined, CrownOutlined } from '@ant-design/icons';

const defaultProps = {
  route: {
    path: '/',
    routes: [
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
            path: '/inventory/warehouses/list',
            name: 'Warehouse',
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
    ],
  },
  location: {
    pathname: '/',
  },
};

export default defaultProps;
