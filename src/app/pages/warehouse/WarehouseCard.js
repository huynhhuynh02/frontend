import React from 'react';
import PropTypes from 'prop-types';
import Card from 'antd/es/card';
import WarehouseList from 'app/pages/warehouse/components/list/WarehouseList';
import WarehouseFilter from 'app/pages/warehouse/components/filter-bar/WarehouseFilter';

function WarehouseCard({ tableProps = {}, filterBarProps = { show: true } }) {
  return (
    <Card bordered={false}>
      {filterBarProps.show && <WarehouseFilter />}
      <br />
      <WarehouseList {...tableProps} />
    </Card>
  );
}

WarehouseCard.propTypes = {
  tableProps: PropTypes.object,
  filterBarProps: PropTypes.object,
};
WarehouseCard.defaultProps = {};

export default WarehouseCard;
