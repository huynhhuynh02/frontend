import React, { useState } from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import defaultProps from './defaultProps';
import HeaderRight from './HeaderRight';

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
        rightContentRender={() => <HeaderRight />}
      >
        <PageContainer pageHeaderRender={() => ''} footer="Yocto ERP 2020">
          {children}
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default Layout;
