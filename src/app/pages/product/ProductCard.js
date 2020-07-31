import React from 'react';
import PropTypes from 'prop-types';
import Card from 'antd/es/card';
import ProductList from 'app/pages/product/components/list/ProductList';
import ProductFilter from 'app/pages/product/components/filter/ProductFilter';

function ProductCard({ tableProps = {}, filterBarProps = { show: true } }) {
  return (
    <Card bordered={false}>
      {filterBarProps.show && <ProductFilter />}
      <br />
      <ProductList {...tableProps} />
    </Card>
  );
}

ProductCard.propTypes = {
  tableProps: PropTypes.object,
  filterBarProps: PropTypes.object,
};
ProductCard.defaultProps = {};

export default ProductCard;
