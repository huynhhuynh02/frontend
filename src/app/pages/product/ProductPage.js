import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import ProductEdit from 'app/pages/product/components/form/ProductEdit';
import ProductCard from 'app/pages/product/ProductCard';
import { ProductUIProvider } from 'app/pages/product/ProductUIContext';
import { pure } from 'recompose';
import { PRODUCT_ROOT_PATH } from 'app/pages/product';

function ProductPage({ history }) {
  const uiEvents = {
    onNew: () => {
      history.push(`${PRODUCT_ROOT_PATH}/new`);
    },
    onEdit: id => {
      history.push(`${PRODUCT_ROOT_PATH}/${id}/edit`);
    },
    onCancel: () => {
      history.push(`${PRODUCT_ROOT_PATH}/list`);
    },
  };
  return (
    <ProductUIProvider uiEvents={uiEvents}>
      <Route path={`${PRODUCT_ROOT_PATH}/new`} component={ProductEdit} />
      <Route path={`${PRODUCT_ROOT_PATH}/:id/edit`} component={ProductEdit} />
      <Route path={`${PRODUCT_ROOT_PATH}/list`} component={ProductCard} />
    </ProductUIProvider>
  );
}

ProductPage.propTypes = {
  history: PropTypes.any,
};

ProductPage.defaultProps = {};

export default pure(ProductPage);
