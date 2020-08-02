import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import history from '_core/utils/history';
import { selectIsHasAnyPermission } from 'app/modules/auth/pages/selectors';

const PrivateRoute = ({
  permissions,
  children,
  component,
  render,
  ...props
}) => {
  const isHasPermission = useSelector(selectIsHasAnyPermission(permissions));
  if (!isHasPermission) {
    history.push('/access-deny');
    return null;
  }
  return (
    <Route {...props}>
      {routeProps => {
        if (typeof children === 'function') {
          return children(routeProps);
        }

        if (!routeProps.match) {
          return null;
        }

        if (children) {
          return children;
        }

        if (component) {
          return React.createElement(component, routeProps);
        }

        if (!routeProps.match) {
          return null;
        }

        if (render) {
          return render(routeProps);
        }

        return null;
      }}
    </Route>
  );
};

PrivateRoute.propTypes = {
  permissions: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
