// import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Modal from 'antd/es/modal';
import { useDispatch } from 'react-redux';
import { actions } from 'app/pages/product/redux/product.duck';

function ProductDeleteDialog({ id, show, onHide }) {
  const dispatch = useDispatch();
  const handleOk = useCallback(() => {
    dispatch(actions.productDeleteStart({ id, callback: onHide }));
  }, [id]);
  return (
    <Modal
      title="Delete Product"
      visible={show}
      onOk={handleOk}
      onCancel={onHide}
      okText="OK"
      cancelText="Cancel"
    >
      <p>Are you sure that you want to remove this record?</p>
    </Modal>
  );
}

ProductDeleteDialog.propTypes = {};
ProductDeleteDialog.defaultProps = {};

export default ProductDeleteDialog;
