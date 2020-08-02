import React from 'react';
// import PropTypes from 'prop-types';
import EditIcon from '@ant-design/icons/lib/icons/EditOutlined';
import Button from 'antd/es/button';

function EditButton({ onClick }) {
  return (
    <Button size="small" onClick={onClick} type="primary" icon={<EditIcon />} />
  );
}

EditButton.propTypes = {};
EditButton.defaultProps = {};

export default EditButton;
