import React, { useCallback, useEffect, useMemo } from 'react';
import Table from 'antd/es/table';

import { useProductUIContext } from 'app/pages/product/ProductUIContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  actions,
  makeSelectProductList,
} from 'app/pages/product/redux/product.duck';
import { SimpleTableAction } from '_core/components/TableAction/SimpleTableAction';
import UpdatedTimeView from '_core/components/UpdatedTimeView';
import UpdatedUserView from '_core/components/UpdatedUserView';

import getSortParams from '_core/utils/getSortPrams';

function ProductList() {
  const productUIContext = useProductUIContext();

  const productUIProps = useMemo(
    () => ({
      queryParams: productUIContext.queryParams,
      setQueryParams: productUIContext.setQueryParams,
      onEdit: productUIContext.onEdit,
      onDelete: productUIContext.onDelete,
    }),
    [productUIContext],
  );

  const dispatch = useDispatch();

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
      title: 'Last Updated',
      width: '15%',
      dataIndex: 'lastModifiedDate',
      render: lastModifiedDate =>
        lastModifiedDate && <UpdatedTimeView value={lastModifiedDate} />,
      sorter: true,
    },
    {
      title: 'Created by',
      width: '10%',
      dataIndex: 'createdBy',
      render: createdBy => <UpdatedUserView {...createdBy} />,
      sorter: true,
    },
    {
      title: 'Actions',
      dataIndex: 'operation',
      key: 'operation',
      width: '100px',
      render: (_, rowData) => (
        <SimpleTableAction
          isShow
          onDelete={() => productUIProps.onDelete(rowData.id)}
          onEdit={() => productUIProps.onEdit(rowData.id)}
        />
      ),
    },
  ];

  const productState = useSelector(makeSelectProductList());
  const { count: totalCount, rows: productRows } = productState;

  useEffect(() => {
    dispatch(actions.productListStart(productUIProps.queryParams));
    return () => dispatch(actions.resetState());
  }, [productUIProps.queryParams, dispatch]);

  const pagination = {
    page: productUIProps.queryParams.page || 1,
    pageSize: productUIProps.queryParams.size,
    total: totalCount || 0,
  };

  const applyFilter = useCallback(
    (pagination, filters, { order, field }) => {
      const newQueryParams = {
        ...productUIProps.queryParams,
        sorts: getSortParams(field, order),
        page: pagination.current - 1,
        size: pagination.pageSize,
      };
      productUIProps.setQueryParams(newQueryParams);
    },
    [productUIProps.queryParams],
  );

  const tableProps = {
    dataSource: productRows || [],
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
