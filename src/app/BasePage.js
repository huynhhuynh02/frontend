import React, { Suspense } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import loadable from '_core/utils/loadable';
import ProductPage, { PRODUCT_ROOT_PATH } from 'app/pages/product';
import Alert from 'antd/es/alert';
import PrivateRoute from 'app/containers/PrivateRoute';
import { PERMISSION } from 'app/constants';

const { ErrorBoundary } = Alert;

// import PropTypes from 'prop-types';
function BasePage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {
            /* Redirect from root URL to /dashboard. */
            <Redirect exact from="/" to="/dashboard" />
          }
          <Route
            path="/dashboard"
            component={loadable(() => import('app/pages/dashboard/Dashboard'))}
          />
          <Route
            path="/inventory"
            component={loadable(() => import('app/pages/inventory'))}
          />
          <Route
            path="/warehouse"
            component={loadable(() => import('app/pages/warehouse'))}
          />
          <Route
            path="/cost"
            component={loadable(() => import('app/pages/cost-management'))}
          />
          <PrivateRoute
            permissions={[PERMISSION.PRODUCT.LIST]}
            path={`${PRODUCT_ROOT_PATH}`}
            component={ProductPage}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
}

BasePage.propTypes = {};
BasePage.defaultProps = {};

export default BasePage;
