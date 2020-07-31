import React from 'react';
import Typography from 'antd/es/typography';
// import PropTypes from 'prop-types';

export function UpdatedTimeView({ value }) {
  return <Typography.Time time={value} />;
}

UpdatedTimeView.propTypes = {};
UpdatedTimeView.defaultProps = {};

export default UpdatedTimeView;
