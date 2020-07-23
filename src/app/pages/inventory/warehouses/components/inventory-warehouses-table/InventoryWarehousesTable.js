import React, { useCallback, useEffect, useMemo } from 'react';
import Modal from 'antd/es/modal';
import Table from 'antd/es/table';
// import Typography from 'antd/es/typography';
import Tooltip from 'antd/es/tooltip';
import Button from 'antd/es/button';
import DeleteIcon from '@ant-design/icons/DeleteOutlined';
import EditIcon from '@ant-design/icons/EditOutlined';
import { useInventoryWarehousesUIContext } from 'app/pages/inventory/warehouses/InventoryWarehoursesUIContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  actions,
  makeSelectInventoryWarehouseList,
} from 'app/pages/inventory/warehouses/redux/inventory-warehouses.duck';

// TODO: FormattedMessage transalation, PropsTypes eslint
const ActionCol = ({ onDelete, onEdit, isShow }) =>
  isShow && (
    <div style={{ textAlign: 'center' }}>
      <Tooltip title="Delete">
        <Button size="small" onClick={onDelete}>
          <DeleteIcon />
        </Button>

        <Button size="small" onClick={onEdit}>
          <EditIcon />
        </Button>
      </Tooltip>
    </div>
  );

const useDeleteInventoryWarehouse = onDeleteInventoryWarehouse => {
  const dispatch = useDispatch();
  return useCallback(
    (rowData, onDeleteInventoryWarehouseCb) => {
      Modal.confirm({
        title: `Delete InventoryWarehouse`,
        content: `Are you sure that you want to remove this record?`,
        onOk: () => {
          dispatch(
            onDeleteInventoryWarehouse(rowData, onDeleteInventoryWarehouseCb),
          );
          return Promise.resolve(true);
        },
      });
    },
    [dispatch],
  );
};

// eslint-disable-next-line no-unused-vars,react/prop-types
function InventoryWarehousesTable({ hideActionCol }) {
  const inventoryWarehousesUIContext = useInventoryWarehousesUIContext();

  const inventoryWarehousesUIProps = useMemo(
    () => ({
      queryParams: inventoryWarehousesUIContext.queryParams,
      setQueryParams: inventoryWarehousesUIContext.setQueryParams,
      onEdit: inventoryWarehousesUIContext.onEdit,
    }),
    [inventoryWarehousesUIContext],
  );

  const dispatch = useDispatch();

  const handleDeleteCallback = useCallback(() => {
    dispatch(actions.filter.start(inventoryWarehousesUIProps.queryParams));
  }, [inventoryWarehousesUIProps]);

  const onDeleteInventoryWarehouse = useDeleteInventoryWarehouse(
    actions.remove.start,
  );

  const columns = [
    {
      title: 'Warehouse',
      dataIndex: 'name',
      width: '20%',
      sorter: true,
    },
    {
      title: 'Product',
      width: '30%',
      dataIndex: 'product',
      sorter: true,
    },
    {
      title: 'Unit',
      width: '10%',
      dataIndex: 'unitName',
      sorter: true,
    },
    {
      title: 'Quantity',
      width: '10%',
      dataIndex: 'quantity',
      sorter: true,
    },
    {
      title: 'Last updated',
      width: '15%',
      // eslint-disable-next-line react/display-name
      // render: (_, rowData) => (
      //   <Typography.Time time={rowData.lastUpdatedDate} />
      // ),
      sorter: true,
    },
  ];

  if (!hideActionCol) {
    columns.push({
      title: 'Actions',
      dataIndex: 'operation',
      key: 'operation',
      width: '100px',
      // eslint-disable-next-line react/display-name
      render: (_, rowData) => (
        <ActionCol
          isShow
          onDelete={() =>
            onDeleteInventoryWarehouse(rowData, handleDeleteCallback)
          }
          onEdit={() => inventoryWarehousesUIProps.onEdit(rowData.id)}
        />
      ),
    });
  }

  const inventoryWarehousesState = useSelector(
    makeSelectInventoryWarehouseList,
  );
  const {
    quantity: totalCount,
    results: inventoryWarehouses,
  } = inventoryWarehousesState;

  useEffect(() => {
    console.log('dispach table');
    dispatch(actions.filter.start(inventoryWarehousesUIProps.queryParams));
    return () => dispatch(actions.resetState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryWarehousesUIProps.queryParams, dispatch]);

  const pagination = {
    page: inventoryWarehousesUIProps.queryParams.page || 0,
    pageSize: inventoryWarehousesUIProps.queryParams.count,
    total: totalCount || 0,
  };
  const applyFilter = useCallback(
    // eslint-disable-next-line no-shadow
    (pagination, filters, { order, field }) => {
      const newQueryParams = {
        ...inventoryWarehousesUIProps.queryParams,
        sortField: field || inventoryWarehousesUIProps.queryParams.sortField,
        isDesc: order !== 'ascend',
        page: pagination.current - 1,
        count: pagination.pageSize,
      };
      inventoryWarehousesUIProps.setQueryParams(newQueryParams);
    },
    [inventoryWarehousesUIProps.queryParams],
  );

  const tableProps = {
    dataSource: inventoryWarehouses || [],
    columns,
    rowKey: row => row.id,
    pagination,
    onChange: applyFilter,
  };

  return <Table {...tableProps} />;
}

InventoryWarehousesTable.propTypes = {};
InventoryWarehousesTable.defaultProps = {};

export default InventoryWarehousesTable;
