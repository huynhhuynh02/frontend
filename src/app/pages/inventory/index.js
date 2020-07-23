import React from 'react';
import { Route, Switch } from 'react-router-dom';
import InventoryWarehousePage from 'app/pages/inventory/warehouses';

function Inventory() {
  console.log('Inventory');
  return (
    <Switch>
      <Route path="/inventory/warehouses" component={InventoryWarehousePage} />
      {/* <Route path="/summary" component={<div>Coming Soon!!</div>} /> */}
    </Switch>
  );
}

Inventory.propTypes = {};

Inventory.defaultProps = {};

export default Inventory;
