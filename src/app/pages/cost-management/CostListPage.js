import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'antd/es/table/Table';
import Button from 'antd/es/button';
import { selectors, actions } from './cost.duck';
import ActionColumn from '../../components/table/ActionColumn';

const CostListPage = () => {
  const rows = useSelector(selectors.rows());
  const count = useSelector(selectors.count());
  const search = useSelector(selectors.search());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      actions.search.success({
        count: 100,
        rows: [
          { name: 'test1', age: 10, address: 'address1', key: 1 },
          { name: 'test2', age: 11, address: 'address2', key: 2 },
          { name: 'test3', age: 12, address: 'address3', key: 3 },
        ],
      }),
    );
  }, [dispatch]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <ActionColumn
          buttons={[
            <Button
              type="primary"
              key={1}
              onClick={() => {
                console.log('test1');
              }}
            >
              Test
            </Button>,
            <Button
              type="primary"
              key={2}
              onClick={() => {
                console.log('test2');
              }}
            >
              Test2
            </Button>,
          ]}
        />
      ),
    },
  ];

  const paging = {
    total: count,
    pageSize: search.size,
  };
  return <Table dataSource={rows} columns={columns} pagination={paging} />;
};

CostListPage.propTypes = {};

export default CostListPage;
