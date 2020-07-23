import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import InventoryWarehousesEdit from 'app/pages/inventory/warehouses/components/inventory-add-or-edit/InventoryWarehousesEdit';
import InventoryWarehouseCard from 'app/pages/inventory/warehouses/InventoryWarehousesCard';
import { InventoryWarehousesUIProvider } from 'app/pages/inventory/warehouses/InventoryWarehoursesUIContext';
import { pure } from 'recompose';

function InventoryWarehousesPage({ history }) {
  const uiEvents = {
    onNew: () => {
      history.push('/inventory/warehouses/new');
    },
    onEdit: id => {
      history.push(`/inventory/warehouses/${id}/edit`);
    },
    onCancel: () => {
      history.push(`/inventory/warehouses/list`);
    },
  };

  console.log('InventoryWarehousesPage');

  return (
    <InventoryWarehousesUIProvider uiEvents={uiEvents}>
      <Route
        path="/inventory/warehouses/new"
        component={InventoryWarehousesEdit}
      />
      <Route
        path="/inventory/warehouses/:id/edit"
        component={InventoryWarehousesEdit}
      />
      <Route
        path="/inventory/warehouses/list"
        component={InventoryWarehouseCard}
      />
    </InventoryWarehousesUIProvider>
  );
}

InventoryWarehousesPage.propTypes = {
  history: PropTypes.any,
};

InventoryWarehousesPage.defaultProps = {};

export default pure(InventoryWarehousesPage);
