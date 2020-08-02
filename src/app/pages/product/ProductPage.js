import React from 'react';
import { Switch } from 'react-router-dom';
import ProductEdit from 'app/pages/product/components/form/ProductEdit';
import ProductsPage from 'app/pages/product/ProductsPage';

import { PRODUCT_ROOT_PATH } from 'app/pages/product';
import PrivateRoute from 'app/containers/PrivateRoute';
import { PERMISSION } from 'app/constants';

function ProductPage() {
  return (
    <Switch>
      <PrivateRoute
        permissions={[PERMISSION.PRODUCT.CREATE]}
        path={`${PRODUCT_ROOT_PATH}/new`}
        component={ProductEdit}
      />
      <PrivateRoute
        permissions={[PERMISSION.PRODUCT.UPDATE]}
        path={`${PRODUCT_ROOT_PATH}/:id/edit`}
        component={ProductEdit}
      />
      <PrivateRoute
        permissions={[PERMISSION.PRODUCT.LIST]}
        path={`${PRODUCT_ROOT_PATH}`}
        component={ProductsPage}
      />
    </Switch>
  );
}

ProductPage.propTypes = {};

ProductPage.defaultProps = {};

export default ProductPage;
