import React, { Suspense } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import loadable from '_core/utils/loadable';
// import PropTypes from 'prop-types';
function BasePage() {
  return (
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
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
}

BasePage.propTypes = {};
BasePage.defaultProps = {};

export default BasePage;
