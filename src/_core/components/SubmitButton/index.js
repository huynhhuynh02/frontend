import React from 'react';
// import PropTypes from 'prop-types';
import { SubmitButton as SubmitButtonAntd } from 'formik-antd';

function SubmitButton() {
  return (
    <SubmitButtonAntd
      type="primary"
      disabled={false}
      style={{ marginLeft: 16 }}
    >
      Submit
    </SubmitButtonAntd>
  );
}

SubmitButton.propTypes = {};
SubmitButton.defaultProps = {};

export default SubmitButton;
