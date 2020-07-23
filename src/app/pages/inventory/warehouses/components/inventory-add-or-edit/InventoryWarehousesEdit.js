import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  actions,
  makeSelectInventoryWarehouseDetail,
} from 'app/pages/inventory/warehouses/redux/inventory-warehouses.duck';

import InventoryWarehouseForm from 'app/pages/inventory/warehouses/components/inventory-add-or-edit/InventoryWarehouseForm';
import { useInventoryWarehousesUIContext } from 'app/pages/inventory/warehouses/InventoryWarehoursesUIContext';

export default function InventoryWarehousesEdit({
  match: {
    params: { id },
  },
}) {
  const inventoryWarehousesUIContext = useInventoryWarehousesUIContext();

  const inventoryWarehousesUIProps = useMemo(
    () => ({
      queryParams: inventoryWarehousesUIContext.queryParams,
      onCancel: inventoryWarehousesUIContext.onCancel,
    }),
    [inventoryWarehousesUIContext],
  );

  const inventoryWarehouseItem = useSelector(
    makeSelectInventoryWarehouseDetail,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(actions.getById.start(id));
    }
  }, [id, dispatch]);

  const handleCancel = () => {
    inventoryWarehousesUIProps.onCancel();
  };

  const handleSave = values => {
    if (!id) {
      dispatch(actions.create.start(values, handleCancel));
    } else {
      dispatch(actions.update.start(values, handleCancel));
    }
  };

  return (
    <InventoryWarehouseForm
      inventoryWarehouseItem={inventoryWarehouseItem}
      onCancel={handleCancel}
      onSave={handleSave}
    />
  );
}
