import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeSelectProductDetail,
  actions,
} from 'app/pages/product/redux/product.duck';

import ProductForm from 'app/pages/product/components/form/ProductForm';
import { PRODUCT_ROOT_PATH } from 'app/pages/product/index';

export default function ProductEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const productItem = useSelector(makeSelectProductDetail());
  const dispatch = useDispatch();

  useEffect(() => {
    // check CREATE or EDIT
    if (id) {
      dispatch(actions.productDetailStart(id));
    }
  }, [id, dispatch]);

  const handleCancel = () => {
    history.push(`${PRODUCT_ROOT_PATH}`);
  };

  const handleSave = (values, formActions) => {
    if (!id) {
      dispatch(
        actions.productCreateStart({
          data: values,
          callback: () => {
            handleCancel();
            formActions.setSubmitting(false);
          },
        }),
      );
    } else {
      dispatch(
        actions.productUpdateStart({
          data: values,
          callback: () => {
            formActions.setSubmitting(false);
          },
        }),
      );
    }
  };

  return (
    <ProductForm
      productItem={productItem}
      onCancel={handleCancel}
      onSave={handleSave}
    />
  );
}
