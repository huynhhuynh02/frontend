import React from 'react';
import Avatar from 'antd/es/avatar';
// import PropTypes from 'prop-types';

export function UpdatedUserView({ value, color = 'blue' }) {
  return (
    <Avatar
      style={{ backgroundColor: color, verticalAlign: 'middle' }}
      size="large"
    >
      {value}
    </Avatar>
  );
}

UpdatedUserView.propTypes = {};
UpdatedUserView.defaultProps = {};

export default UpdatedUserView;
