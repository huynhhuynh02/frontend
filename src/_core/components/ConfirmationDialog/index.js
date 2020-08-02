import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import Modal from 'antd/es/modal';
import ExclamationCircleOutlined from '@ant-design/icons/es/icons/ExclamationCircleOutlined';

function ConfirmationDialog({ show, onCancel, onOk, title = 'Confirm' }) {
  useEffect(() => {
    if (show) {
      Modal.confirm({
        title,
        icon: <ExclamationCircleOutlined />,
        content: 'Are you sure that you want to remove this record?',
        okText: 'OK',
        cancelText: 'Cancel',
        onOk,
        onCancel,
      });
    }
  }, [show]);
  return <></>;
}

ConfirmationDialog.propTypes = {};
ConfirmationDialog.defaultProps = {};

export default ConfirmationDialog;
