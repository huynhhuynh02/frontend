import React from 'react';
// import PropTypes from 'prop-types';
import Button from 'antd/es/button';

function CancelButton({ onClick }) {
  return <Button onClick={onClick}>Cancel</Button>;
}

CancelButton.propTypes = {};
CancelButton.defaultProps = {};

export default CancelButton;
