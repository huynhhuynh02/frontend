import React from 'react';
import Avatar from 'antd/es/avatar';
// import PropTypes from 'prop-types';

function UpdatedUserView({ displayName, color = 'blue' }) {
  return (
    <Avatar
      style={{ backgroundColor: color, verticalAlign: 'middle' }}
      size="large"
    >
      {displayName}
    </Avatar>
  );
}

UpdatedUserView.propTypes = {};
UpdatedUserView.defaultProps = {};

export default UpdatedUserView;
