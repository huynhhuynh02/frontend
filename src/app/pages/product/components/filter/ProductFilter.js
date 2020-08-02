import React, { useMemo, useState, useCallback, useEffect } from 'react';
import Input from 'antd/es/input';
import DatePicker from 'antd/es/date-picker';
import isEqual from 'lodash/isEqual';
import styled from 'styled-components';
import _debounce from 'lodash/fp/debounce';

import { useProductUIContext } from 'app/pages/product/ProductUIContext';
import { SearchOutlined } from '@ant-design/icons';
import AddButton from '_core/components/AddButton';
import { DEBOUNCING_TIME_AUTO_SEARCH } from 'app/constants';

const prepareFilter = (queryParams, searchParams) => ({
  ...queryParams,
  ...searchParams,
});

const ActionWrapper = styled.div`
  margin: 16px 0;
  text-align: right;
`;

const FilterBar = ({ initialValues, onSearch, onAdd }) => {
  const [searchParams, setSearchParams] = useState({
    search: initialValues.search || '',
    dateRange: {
      startDate: '',
      endDate: '',
    },
  });

  const handleChangeValue = (name, value) => {
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  useEffect(() => {
    onSearch({
      search: searchParams.search,
      startDate: searchParams.dateRange.startDate,
      endDate: searchParams.dateRange.endDate,
    });
  }, [searchParams]);

  return (
    <>
      <ActionWrapper>
        <AddButton label="Add Product" onClick={onAdd} />
      </ActionWrapper>
      <Input.Group compact>
        <Input
          prefix={<SearchOutlined />}
          style={{ width: '55%' }}
          onChange={e => handleChangeValue('search', e.currentTarget.value)}
          placeholder="Search by name ..."
        />
        <DatePicker.RangePicker
          style={{ width: '45%' }}
          onChange={values => {
            handleChangeValue('dateRange', {
              startDate: values[0].toISOString(),
              endDate: values[1].toISOString(),
            });
          }}
        />
      </Input.Group>
    </>
  );
};

function ProductFilter() {
  const productUIContext = useProductUIContext();

  const productUIProps = useMemo(
    () => ({
      setQueryParams: productUIContext.setQueryParams,
      queryParams: productUIContext.queryParams,
      onAddButtonClick: productUIContext.onNew,
    }),
    [productUIContext],
  );

  const applyFilter = searchParams => {
    const newQueryParams = prepareFilter(
      productUIProps.queryParams,
      searchParams,
    );
    if (!isEqual(newQueryParams, productUIProps.queryParams)) {
      newQueryParams.page = 1;
      productUIProps.setQueryParams(newQueryParams);
    }
  };

  const onAutoSearch = useCallback(
    _debounce(
      DEBOUNCING_TIME_AUTO_SEARCH,
      (...args) => applyFilter && applyFilter(...args),
    ),
    [applyFilter],
  );

  return (
    <FilterBar
      initialValues={productUIProps.queryParams}
      onSearch={onAutoSearch}
      onAdd={productUIProps.onAddButtonClick}
    />
  );
}

ProductFilter.propTypes = {};
ProductFilter.defaultProps = {};

export default ProductFilter;
