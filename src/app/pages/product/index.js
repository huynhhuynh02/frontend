import React from 'react';
import { FormattedMessage } from 'react-intl';

import loadable from '_core/utils/loadable';
import { useInjectReducer } from '_core/utils/injectReducer';
import { MODULE_STATE_NAME } from 'app/pages/product/constants';
import { reducer, saga } from 'app/pages/product/redux/product.duck';
import { useInjectSaga } from '_core/utils/injectSaga';
import { CrownOutlined } from '@ant-design/icons';
import messages from './messages';

export const PRODUCT_ROOT_PATH = '/product';

export const PRODUCT_MENU = {
  path: `${PRODUCT_ROOT_PATH}/list`,
  name: <FormattedMessage {...messages.menuTitle} />,
  icon: <CrownOutlined />,
};

const ProductPageLazy = loadable(() => import('app/pages/product/ProductPage'));

function ProductPage(props) {
  useInjectReducer({ key: MODULE_STATE_NAME, reducer });
  useInjectSaga({ key: MODULE_STATE_NAME, saga });
  return <ProductPageLazy {...props} />;
}

export default ProductPage;
