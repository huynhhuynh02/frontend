import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeSelectWarehouseDetail,
  actions,
} from 'app/pages/warehouse/redux/warehouse.duck';

import WarehouseForm from 'app/pages/warehouse/components/form/WarehouseForm';
import { useWarehouseUIContext } from 'app/pages/warehouse/WarehouseUIContext';

export default function WarehouseEdit({
  match: {
    params: { id },
  },
}) {
  const warehouseUIContext = useWarehouseUIContext();

  const warehouseUIProps = useMemo(
    () => ({
      queryParams: warehouseUIContext.queryParams,
      onCancel: warehouseUIContext.onCancel,
    }),
    [warehouseUIContext],
  );

  const warehouseItem = useSelector(makeSelectWarehouseDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(actions.warehouseDetailStart(id));
    }
  }, [id, dispatch]);

  const handleCancel = () => {
    warehouseUIProps.onCancel();
  };

  const handleSave = values => {
    if (!id) {
      dispatch(actions.warehouseCreateStart(values, handleCancel));
    } else {
      dispatch(actions.warehouseUpdateStart(values, handleCancel));
    }
  };

  return (
    <WarehouseForm
      warehouseItem={warehouseItem}
      onCancel={handleCancel}
      onSave={handleSave}
    />
  );
}
