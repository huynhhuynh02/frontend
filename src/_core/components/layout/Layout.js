import React, { useState } from 'react';
import { Avatar } from 'antd';
import { push } from 'connected-react-router';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import defaultProps from './defaultProps';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const [pathname, setPathname] = useState(window.location.pathname);
  const dispatch = useDispatch();
  return (
    <div
      id="test-pro-layout"
      style={{
        transform: 'rotate(0)',
        overflowX: 'hidden',
      }}
    >
      <ProLayout
        {...defaultProps}
        title="Yocto ERP"
        style={{
          maxHeight: '100vh',
        }}
        location={{
          pathname,
        }}
        menuItemRender={(item, dom) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <a
            onClick={() => {
              setPathname(item.path || '/dashboard');
              dispatch(push(item.path));
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
      >
        <PageContainer footer="Yocto ERP 2020">{children}</PageContainer>
      </ProLayout>
    </div>
  );
};

export default Layout;
