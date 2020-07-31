import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import WarehouseEdit from 'app/pages/warehouse/components/form/WarehouseEdit';
import WarehouseCard from 'app/pages/warehouse/WarehouseCard';
import { WarehouseUIProvider } from 'app/pages/warehouse/WarehouseUIContext';
import { pure } from 'recompose';
import { WAREHOUSE_ROOT_PATH } from 'app/pages/warehouse/index';

function WarehousePage({ history }) {
  const uiEvents = {
    onNew: () => {
      history.push(`${WAREHOUSE_ROOT_PATH}/new`);
    },
    onEdit: id => {
      history.push(`${WAREHOUSE_ROOT_PATH}/${id}/edit`);
    },
    onCancel: () => {
      history.push(`${WAREHOUSE_ROOT_PATH}/list`);
    },
  };
  return (
    <WarehouseUIProvider uiEvents={uiEvents}>
      <Route path={`${WAREHOUSE_ROOT_PATH}/new`} component={WarehouseEdit} />
      <Route
        path={`${WAREHOUSE_ROOT_PATH}/:id/edit`}
        component={WarehouseEdit}
      />
      <Route path={`${WAREHOUSE_ROOT_PATH}/list`} component={WarehouseCard} />
    </WarehouseUIProvider>
  );
}

WarehousePage.propTypes = {
  history: PropTypes.any,
};

WarehousePage.defaultProps = {};

export default pure(WarehousePage);
