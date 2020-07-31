import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import AccessDeniedPage from '../pages/error/AccessDeniedPage';
import { selectIsHasAnyPermission } from '../modules/auth/pages/selectors';

const PrivateRoute = ({ permissions, children, ...rest }) => {
  const isHasPermission = useSelector(selectIsHasAnyPermission(permissions));
  return (
    <Route
      {...rest}
      render={() => (isHasPermission ? children : <AccessDeniedPage />)}
    />
  );
};

PrivateRoute.propTypes = {
  permissions: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
