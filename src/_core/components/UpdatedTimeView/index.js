import React from 'react';
import Typography from 'antd/es/typography';
import moment from 'moment';
// import PropTypes from 'prop-types';
function UpdatedTimeView({ value = moment().toISOString() }) {
  const formatedValue = moment(value).fromNow();
  return <Typography>{formatedValue}</Typography>;
}

UpdatedTimeView.propTypes = {};
UpdatedTimeView.defaultProps = {};

export default UpdatedTimeView;
