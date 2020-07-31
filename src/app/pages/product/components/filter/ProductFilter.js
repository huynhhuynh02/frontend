import React, { useCallback, useMemo, useState } from 'react';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import Button from 'antd/es/button';
import DatePicker from 'antd/es/date-picker';
import isEqual from 'lodash/isEqual';
import { useProductUIContext } from 'app/pages/product/ProductUIContext';

const prepareFilter = (queryParams, searchParams) => ({
  ...queryParams,
  ...searchParams,
});

const FilterBar = props => {
  const [searchParams, setSearchParams] = useState({
    productId: null,
    queryString: null,
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

  const handleSearch = value => {
    props.onSearch({
      queryString: value,
      productId: searchParams.productId,
      startDate: searchParams.dateRange.startDate,
      endDate: searchParams.dateRange.endDate,
    });
  };
  const handleSearchCallback = useCallback(handleSearch, [searchParams]);

  return (
    <Input.Group compact>
      <DatePicker.RangePicker
        style={{ width: '20%' }}
        onChange={values => {
          handleChangeValue('dateRange', {
            startDate: values[0].toISOString(),
            endDate: values[1].toISOString(),
          });
        }}
      />
      <Select
        name="productId"
        defaultValue="all"
        style={{ width: '20%' }}
        onChange={value => handleChangeValue('productId', value)}
      >
        <Select.Option value="all">All</Select.Option>
        <Select.Option value="product1">Product 1</Select.Option>
      </Select>
      <Input.Search
        style={{ width: '55%' }}
        onSearch={handleSearchCallback}
        placeholder="input search text"
        enterButton="Search"
      />
      <Button
        type="primary"
        onClick={props.onAdd}
        style={{ width: '5%', float: 'right' }}
      >
        New
      </Button>
    </Input.Group>
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
    console.log('searchParams', searchParams);
    const newQueryParams = prepareFilter(
      productUIProps.queryParams,
      searchParams,
    );
    if (!isEqual(newQueryParams, productUIProps.queryParams)) {
      newQueryParams.page = 0;
      productUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <FilterBar onSearch={applyFilter} onAdd={productUIProps.onAddButtonClick} />
  );
}

ProductFilter.propTypes = {};
ProductFilter.defaultProps = {};

export default ProductFilter;
