import React from 'react';
// import PropTypes from 'prop-types';
import Button from 'antd/es/button';
import DeleteIcon from '@ant-design/icons/lib/icons/DeleteOutlined';

function DeleteButton({ onClick }) {
  return (
    <Button
      size="small"
      onClick={onClick}
      type="danger"
      icon={<DeleteIcon />}
    />
  );
}

DeleteButton.propTypes = {};
DeleteButton.defaultProps = {};

export default DeleteButton;
