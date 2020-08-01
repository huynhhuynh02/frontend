import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CostCreatePage from './CostCreatePage';
import CostEditPage from './CostEditPage';
import CostListPage from './CostListPage';
import { useInjectReducer } from '../../../_core/utils/injectReducer';
import { COST_MODULE_NAME, reducer } from './cost.duck';

const CostMainPage = () => {
  const path = '/cost';
  useInjectReducer({ key: COST_MODULE_NAME, reducer });

  return (
    <Switch>
      {
        /* Redirect from root URL to /dashboard. */
        <Redirect exact from={path} to={`${path}/list`} />
      }
      <Route path={`${path}/new`} component={CostCreatePage} />
      <Route path={`${path}/:id/edit`} component={CostEditPage} />
      <Route path={`${path}/list`} component={CostListPage} />
    </Switch>
  );
};

CostMainPage.propTypes = {};

export default CostMainPage;
