import React from 'react';
import PropTypes from 'prop-types';
import Card from 'antd/es/card';
import InventoryWarehousesTable from 'app/pages/inventory/warehouses/components/inventory-warehouses-table/InventoryWarehousesTable';
import InventoryWarehouseFilter from 'app/pages/inventory/warehouses/components/inventory-warehouses-filter/InventoryWarehouseFilter';

function InventoryWarehouseCard({
  tableProps = {},
  filterBarProps = { show: true },
}) {
  return (
    <Card bordered={false}>
      {filterBarProps.show && <InventoryWarehouseFilter />}
      <br />
      <InventoryWarehousesTable {...tableProps} />
    </Card>
  );
}

InventoryWarehouseCard.propTypes = {
  tableProps: PropTypes.object,
  filterBarProps: PropTypes.object,
};
InventoryWarehouseCard.defaultProps = {};

export default InventoryWarehouseCard;
