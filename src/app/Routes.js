import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Logout, Login } from 'app/modules/auth/pages';
import Layout from '_core/components/layout/Layout';
import ErrorsPage from 'app/pages/error/ErrorsPage';
import BasePage from './BasePage';
import { selectIsAuthorize } from './modules/auth/pages/selectors';

export function Routes() {
  const isAuthorized = useSelector(selectIsAuthorize());

  return (
    <Switch>
      <Route path="/auth/register" component={Login} />
      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={Logout} />

      {!isAuthorized ? (
        /* Render auth page when user at `/auth` and not authorized. */
        <Route>
          <Login />
        </Route>
      ) : (
        <Layout>
          <BasePage />
        </Layout>
      )}
    </Switch>
  );
}
