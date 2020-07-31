import React, { useCallback, useEffect, useMemo } from 'react';
import Modal from 'antd/es/modal';
import Table from 'antd/es/table';
import { useProductUIContext } from 'app/pages/product/ProductUIContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  actions,
  makeSelectProductList,
} from 'app/pages/product/redux/product.duck';
import { SimpleTableAction } from '_core/components/TableAction/SimpleTableAction';
import UpdatedTimeView from '_core/components/UpdatedTimeView/UpdatedTimeView';
import UpdatedUserView from '_core/components/UpdatedUserView/UpdatedUserView';

const useDeleteProduct = onDeleteProduct => {
  const dispatch = useDispatch();
  return useCallback(
    (rowData, onDeleteProductCb) => {
      Modal.confirm({
        title: `Delete Product`,
        content: `Are you sure that you want to remove this record?`,
        onOk: () => {
          dispatch(onDeleteProduct(rowData, onDeleteProductCb));
          return Promise.resolve(true);
        },
      });
    },
    [dispatch],
  );
};

function ProductList({ hideActionCol }) {
  const productUIContext = useProductUIContext();

  const productUIProps = useMemo(
    () => ({
      queryParams: productUIContext.queryParams,
      setQueryParams: productUIContext.setQueryParams,
      onEdit: productUIContext.onEdit,
    }),
    [productUIContext],
  );

  const dispatch = useDispatch();

  const handleDeleteCallback = useCallback(() => {
    dispatch(actions.filter.start(productUIProps.queryParams));
  }, [productUIProps]);

  const onDeleteProduct = useDeleteProduct(actions.productDeleteStart);
  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageId',
      width: '20%',
      sorter: true,
    },
    {
      title: 'Name',
      width: '20%',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Price Base Unit',
      width: '10%',
      dataIndex: 'priceBaseUnit',
      sorter: true,
    },
    {
      title: 'Remark',
      width: '20%',
      dataIndex: 'remark',
      sorter: true,
    },
    {
      title: 'Last updated time',
      width: '15%',
      render: (_, rowData) => (
        <UpdatedTimeView value={rowData.lastModifiedDate} />
      ),
      sorter: true,
    },
    {
      title: 'Created by',
      width: '10%',
      render: (_, rowData) => (
        <UpdatedUserView
          value={rowData.createdBy ? rowData.createdBy.name : ''}
        />
      ),
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
        <SimpleTableAction
          isShow
          onDelete={() => onDeleteProduct(rowData, handleDeleteCallback)}
          onEdit={() => productUIProps.onEdit(rowData.id)}
        />
      ),
    });
  }

  const productState = useSelector(makeSelectProductList);
  const { quantity: totalCount, results: product } = productState;

  useEffect(() => {
    console.log('dispach table');
    dispatch(actions.productListStart(productUIProps.queryParams));
    return () => dispatch(actions.resetState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productUIProps.queryParams, dispatch]);

  const pagination = {
    page: productUIProps.queryParams.page || 0,
    pageSize: productUIProps.queryParams.count,
    total: totalCount || 0,
  };
  const applyFilter = useCallback(
    // eslint-disable-next-line no-shadow
    (pagination, filters, { order, field }) => {
      const newQueryParams = {
        ...productUIProps.queryParams,
        sortField: field || productUIProps.queryParams.sortField,
        isDesc: order !== 'ascend',
        page: pagination.current - 1,
        count: pagination.pageSize,
      };
      productUIProps.setQueryParams(newQueryParams);
    },
    [productUIProps.queryParams],
  );

  const tableProps = {
    dataSource: product || [],
    columns,
    rowKey: row => row.id,
    pagination,
    onChange: applyFilter,
  };

  return <Table {...tableProps} />;
}

ProductList.propTypes = {};
ProductList.defaultProps = {};

export default ProductList;
