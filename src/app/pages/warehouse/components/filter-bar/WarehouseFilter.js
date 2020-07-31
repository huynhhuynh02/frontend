import React, { useCallback, useMemo, useState } from 'react';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import Button from 'antd/es/button';
import DatePicker from 'antd/es/date-picker';
import isEqual from 'lodash/isEqual';
import { useWarehouseUIContext } from 'app/pages/warehouse/WarehouseUIContext';

const prepareFilter = (queryParams, searchParams) => ({
  ...queryParams,
  ...searchParams,
});

const FilterBar = props => {
  const [searchParams, setSearchParams] = useState({
    warehouseId: null,
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
      warehouseId: searchParams.warehouseId,
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
        name="warehouseId"
        defaultValue="all"
        style={{ width: '20%' }}
        onChange={value => handleChangeValue('warehouseId', value)}
      >
        <Select.Option value="all">All</Select.Option>
        <Select.Option value="warehouse1">Warehouse 1</Select.Option>
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

function WarehouseFilter() {
  const warehouseUIContext = useWarehouseUIContext();

  const warehouseUIProps = useMemo(
    () => ({
      setQueryParams: warehouseUIContext.setQueryParams,
      queryParams: warehouseUIContext.queryParams,
      onAddButtonClick: warehouseUIContext.onNew,
    }),
    [warehouseUIContext],
  );

  const applyFilter = searchParams => {
    console.log('searchParams', searchParams);
    const newQueryParams = prepareFilter(
      warehouseUIProps.queryParams,
      searchParams,
    );
    if (!isEqual(newQueryParams, warehouseUIProps.queryParams)) {
      newQueryParams.page = 0;
      warehouseUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <FilterBar
      onSearch={applyFilter}
      onAdd={warehouseUIProps.onAddButtonClick}
    />
  );
}

WarehouseFilter.propTypes = {};
WarehouseFilter.defaultProps = {};

export default WarehouseFilter;
