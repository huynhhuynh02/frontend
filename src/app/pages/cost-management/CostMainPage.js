import React from 'react';
import { pure } from 'recompose';
import { Redirect, Route, Switch } from 'react-router-dom';
import CostCreatePage from './CostCreatePage';
import CostEditPage from './CostEditPage';
import CostListPage from './CostListPage';
import PrivateRoute from '../../components/PrivateRoute';
import { PERMISSION } from '../../constants';

const CostMainPage = () => {
  const path = '/cost';
  return (
    <Switch>
      {
        /* Redirect from root URL to /dashboard. */
        <Redirect exact from={path} to={`${path}/list`} />
      }
      <Route path={`${path}/new`} component={CostCreatePage} />
      <Route path={`${path}/:id/edit`} component={CostEditPage} />
      <PrivateRoute
        path={`${path}/list`}
        permissions={[PERMISSION.WAREHOUSE.CREATE]}
      >
        <CostListPage />
      </PrivateRoute>
    </Switch>
  );
};

CostMainPage.propTypes = {};

export default pure(CostMainPage);
