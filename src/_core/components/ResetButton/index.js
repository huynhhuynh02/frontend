import React from 'react';
// import PropTypes from 'prop-types';
import { ResetButton as ResetButtonAntd } from 'formik-antd';

function ResetButton({ onClick, label = 'Reset' }) {
  return <ResetButtonAntd onClick={onClick}>{label}</ResetButtonAntd>;
}

ResetButton.propTypes = {};
ResetButton.defaultProps = {};

export default ResetButton;
