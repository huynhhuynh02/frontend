import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import ProductEdit from 'app/pages/product/components/form/ProductEdit';
import ProductCard from 'app/pages/product/ProductCard';
import { ProductUIProvider } from 'app/pages/product/ProductUIContext';
import { PRODUCT_ROOT_PATH } from 'app/pages/product';
import ProductDeleteDialog from 'app/pages/product/components/delete/ProductDeleteDialog';

function ProductPage({ history }) {
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
      history.push(`${PRODUCT_ROOT_PATH}/list`);
    },
  };
  return (
    <ProductUIProvider uiEvents={uiEvents}>
      <Switch>
        <Route path={`${PRODUCT_ROOT_PATH}/new`} component={ProductEdit} />
        <Route path={`${PRODUCT_ROOT_PATH}/:id/edit`} component={ProductEdit} />
        <Route
          path={`${PRODUCT_ROOT_PATH}/list`}
          component={ProductCard}
          exact
        />
        <Route path={`${PRODUCT_ROOT_PATH}/:id/delete`}>
          {({ match }) => (
            <ProductDeleteDialog
              show={match != null}
              id={match && match.params.id}
              onHide={uiEvents.onCancel}
            />
          )}
        </Route>
      </Switch>
    </ProductUIProvider>
  );
}

ProductPage.propTypes = {
  history: PropTypes.any,
};

ProductPage.defaultProps = {};

export default ProductPage;
