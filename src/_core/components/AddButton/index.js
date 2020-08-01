import React from 'react';
// import PropTypes from 'prop-types';
import Button from 'antd/es/button';

function AddButton({ onClick, label = 'Add' }) {
  return (
    <Button type="primary" onClick={onClick}>
      {label}
    </Button>
  );
}

AddButton.propTypes = {};
AddButton.defaultProps = {};

export default AddButton;
