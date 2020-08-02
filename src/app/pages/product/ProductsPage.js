import React from 'react';
import Card from 'antd/es/card';
import ProductList from 'app/pages/product/components/list/ProductList';
import ProductFilter from 'app/pages/product/components/filter/ProductFilter';
import { PRODUCT_ROOT_PATH } from 'app/pages/product/index';
import ProductDeleteDialog from 'app/pages/product/components/delete/ProductDeleteDialog';
import { ProductUIProvider } from 'app/pages/product/ProductUIContext';
import { PERMISSION } from 'app/constants';
import PrivateRoute from 'app/containers/PrivateRoute';

function ProductsPage({ history }) {
  const uiEvents = {
    onNew: () => {
      history.push(`${PRODUCT_ROOT_PATH}/new`);
    },
    onEdit: id => {
      history.push(`${PRODUCT_ROOT_PATH}/${id}/edit`);
    },
    onDelete: id => {
      history.push(`${PRODUCT_ROOT_PATH}/${id}/delete`);
    },
    onCancel: () => {
      history.push(`${PRODUCT_ROOT_PATH}`);
    },
  };
  return (
    <ProductUIProvider uiEvents={uiEvents}>
      <Card bordered={false}>
        <ProductFilter />
        <br />
        <ProductList />
      </Card>
      <PrivateRoute
        permissions={[PERMISSION.PRODUCT.DELETE]}
        path={`${PRODUCT_ROOT_PATH}/:id/delete`}
      >
        {({ match }) => (
          <ProductDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={uiEvents.onCancel}
          />
        )}
      </PrivateRoute>
    </ProductUIProvider>
  );
}

ProductsPage.propTypes = {};
ProductsPage.defaultProps = {};

export default ProductsPage;
