import React, { useCallback, useEffect, useMemo } from 'react';
import Modal from 'antd/es/modal';
import Table from 'antd/es/table';
// import Typography from 'antd/es/typography';
import Tooltip from 'antd/es/tooltip';
import Button from 'antd/es/button';
import DeleteIcon from '@ant-design/icons/DeleteOutlined';
import EditIcon from '@ant-design/icons/EditOutlined';
import { useWarehouseUIContext } from 'app/pages/warehouse/WarehouseUIContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeSelectWarehouseList,
  actions,
} from 'app/pages/warehouse/redux/warehouse.duck';

// TODO: FormattedMessage translation, PropsTypes eslint
const ActionCol = ({ onDelete, onEdit, isShow }) =>
  isShow && (
    <div style={{ textAlign: 'center' }}>
      <Tooltip title="Delete">
        <Button
          size="small"
          onClick={onDelete}
          type="danger"
          icon={<DeleteIcon />}
        />
        <Button
          size="small"
          onClick={onEdit}
          type="primary"
          icon={<EditIcon />}
        />
      </Tooltip>
    </div>
  );

const useDeleteWarehouse = onDeleteWarehouse => {
  const dispatch = useDispatch();
  return useCallback(
    (rowData, onDeleteWarehouseCb) => {
      Modal.confirm({
        title: `Delete Warehouse`,
        content: `Are you sure that you want to remove this record?`,
        onOk: () => {
          dispatch(onDeleteWarehouse(rowData, onDeleteWarehouseCb));
          return Promise.resolve(true);
        },
      });
    },
    [dispatch],
  );
};

// eslint-disable-next-line no-unused-vars,react/prop-types
function WarehouseList({ hideActionCol }) {
  const warehouseUIContext = useWarehouseUIContext();

  const warehouseUIProps = useMemo(
    () => ({
      queryParams: warehouseUIContext.queryParams,
      setQueryParams: warehouseUIContext.setQueryParams,
      onEdit: warehouseUIContext.onEdit,
    }),
    [warehouseUIContext],
  );

  const dispatch = useDispatch();

  const handleDeleteCallback = useCallback(() => {
    dispatch(actions.filter.start(warehouseUIProps.queryParams));
  }, [warehouseUIProps]);

  const onDeleteWarehouse = useDeleteWarehouse(actions.warehouseDeleteStart);

  const columns = [
    {
      title: 'Warehouse',
      dataIndex: 'name',
      width: '30%',
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
          onDelete={() => onDeleteWarehouse(rowData, handleDeleteCallback)}
          onEdit={() => warehouseUIProps.onEdit(rowData.id)}
        />
      ),
    });
  }

  const warehouseState = useSelector(makeSelectWarehouseList);
  const { quantity: totalCount, results: warehouse } = warehouseState;

  useEffect(() => {
    console.log('dispach table');
    dispatch(actions.warehouseListStart(warehouseUIProps.queryParams));
    return () => dispatch(actions.resetState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warehouseUIProps.queryParams, dispatch]);

  const pagination = {
    page: warehouseUIProps.queryParams.page || 0,
    pageSize: warehouseUIProps.queryParams.count,
    total: totalCount || 0,
  };
  const applyFilter = useCallback(
    // eslint-disable-next-line no-shadow
    (pagination, filters, { order, field }) => {
      const newQueryParams = {
        ...warehouseUIProps.queryParams,
        sortField: field || warehouseUIProps.queryParams.sortField,
        isDesc: order !== 'ascend',
        page: pagination.current - 1,
        count: pagination.pageSize,
      };
      warehouseUIProps.setQueryParams(newQueryParams);
    },
    [warehouseUIProps.queryParams],
  );

  const tableProps = {
    dataSource: warehouse || [],
    columns,
    rowKey: row => row.id,
    pagination,
    onChange: applyFilter,
  };

  return <Table {...tableProps} />;
}

WarehouseList.propTypes = {};
WarehouseList.defaultProps = {};

export default WarehouseList;
