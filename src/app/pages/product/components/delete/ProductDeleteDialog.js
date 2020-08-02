// import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from 'app/pages/product/redux/product.duck';
import ConfirmationDialog from '_core/components/ConfirmationDialog';
import { useProductUIContext } from 'app/pages/product/ProductUIContext';

function ProductDeleteDialog({ id, show, onHide }) {
  const dispatch = useDispatch();
  const productUIContext = useProductUIContext();
  const productUIProps = useMemo(
    () => ({
      queryParams: productUIContext.queryParams,
    }),
    [productUIContext],
  );

  const handleReloadList = useCallback(() => {
    dispatch(actions.productListStart(productUIProps.queryParams));
  }, [id]);

  const handleCallback = () => {
    handleReloadList();
    onHide();
  };

  const handleOk = useCallback(() => {
    dispatch(actions.productDeleteStart({ id, callback: handleCallback }));
  }, [id]);
  return (
    <ConfirmationDialog
      title="Delete Product"
      show={show}
      onCancel={onHide}
      onOk={handleOk}
    />
  );
}

ProductDeleteDialog.propTypes = {};
ProductDeleteDialog.defaultProps = {};

export default ProductDeleteDialog;
