import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login } from 'app/modules/auth/pages';
import Layout from '_core/components/layout/Layout';
import ErrorsPage from 'app/pages/error/ErrorsPage';
import BasePage from './BasePage';
import { selectIsAuthorize } from './modules/auth/pages/selectors';
import SplashScreen from './pages/splashscreen/SplashScreen';
import { selectIsInit } from './pages/splashscreen/reducer';
import { useInjectReducer } from '../_core/utils/injectReducer';
import { MODULE_STATE_NAME, reducer, saga } from './modules/auth/pages/reducer';
import { useInjectSaga } from '../_core/utils/injectSaga';

export function Routes() {
  useInjectReducer({ key: MODULE_STATE_NAME, reducer });
  useInjectSaga({ key: MODULE_STATE_NAME, saga });

  const isAuthorized = useSelector(selectIsAuthorize());
  const isInit = useSelector(selectIsInit());

  let screen;

  if (!isInit) {
    screen = (
      <Route>
        <SplashScreen />
      </Route>
    );
  } else if (!isAuthorized) {
    screen = (
      <Route>
        <Login />
      </Route>
    );
  } else {
    screen = (
      <Layout>
        <BasePage />
      </Layout>
    );
  }

  return (
    <Switch>
      <Route path="/auth/login" component={Login} />
      <Route path="/error" component={ErrorsPage} />
      {screen}
    </Switch>
  );
}
