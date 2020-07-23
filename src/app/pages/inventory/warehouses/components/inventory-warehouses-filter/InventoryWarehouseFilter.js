import React, { useCallback, useMemo, useState } from 'react';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import Button from 'antd/es/button';
import DatePicker from 'antd/es/date-picker';
import isEqual from 'lodash/isEqual';
import { useInventoryWarehousesUIContext } from 'app/pages/inventory/warehouses/InventoryWarehoursesUIContext';

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

function InventoryWarehouseFilter() {
  const inventoryWarehousesUIContext = useInventoryWarehousesUIContext();

  const inventoryWarehousesUIProps = useMemo(
    () => ({
      setQueryParams: inventoryWarehousesUIContext.setQueryParams,
      queryParams: inventoryWarehousesUIContext.queryParams,
      onAddButtonClick: inventoryWarehousesUIContext.onNew,
    }),
    [inventoryWarehousesUIContext],
  );

  const applyFilter = searchParams => {
    console.log('searchParams', searchParams);
    const newQueryParams = prepareFilter(
      inventoryWarehousesUIProps.queryParams,
      searchParams,
    );
    if (!isEqual(newQueryParams, inventoryWarehousesUIProps.queryParams)) {
      newQueryParams.page = 0;
      inventoryWarehousesUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <FilterBar
      onSearch={applyFilter}
      onAdd={inventoryWarehousesUIProps.onAddButtonClick}
    />
  );
}

InventoryWarehouseFilter.propTypes = {};
InventoryWarehouseFilter.defaultProps = {};

export default InventoryWarehouseFilter;
