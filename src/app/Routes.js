import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
// import { shallowEqual, useSelector } from 'react-redux';
import { Logout, AuthPage } from 'app/modules/auth/pages';
import Layout from '_core/components/layout/Layout';
import ErrorsPage from 'app/pages/error/ErrorsPage';
import BasePage from './BasePage';

export function Routes() {
  // const { isAuthorized } = useSelector(
  //   ({ auth }) => ({
  //     isAuthorized: auth.user != null,
  //   }),
  //   shallowEqual,
  // );
  const isAuthorized = true;
  return (
    <Switch>
      {!isAuthorized ? (
        /* Render auth page when user at `/auth` and not authorized. */
        <Route>
          <AuthPage />
        </Route>
      ) : (
        /* Otherwise redirect to root page (`/`) */
        <Redirect from="/auth" to="/" />
      )}

      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={Logout} />

      {!isAuthorized ? (
        /* Redirect to `/auth` when user is not authorized */
        <Redirect to="/auth/login" />
      ) : (
        <Layout>
          <BasePage />
        </Layout>
      )}
    </Switch>
  );
}
