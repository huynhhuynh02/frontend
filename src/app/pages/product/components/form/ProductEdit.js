import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeSelectProductDetail,
  actions,
} from 'app/pages/product/redux/product.duck';

import ProductForm from 'app/pages/product/components/form/ProductForm';
import { useProductUIContext } from 'app/pages/product/ProductUIContext';

export default function ProductEdit({
  match: {
    params: { id },
  },
}) {
  const productUIContext = useProductUIContext();

  const productUIProps = useMemo(
    () => ({
      queryParams: productUIContext.queryParams,
      onCancel: productUIContext.onCancel,
    }),
    [productUIContext],
  );

  const productItem = useSelector(makeSelectProductDetail());
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(actions.productDetailStart(id));
    }
  }, [id, dispatch]);

  const handleCancel = () => {
    productUIProps.onCancel();
  };

  const handleSave = values => {
    if (!id) {
      dispatch(
        actions.productCreateStart({
          data: values,
          callback: handleCancel,
        }),
      );
    } else {
      dispatch(
        actions.productUpdateStart({
          data: values,
          callback: handleCancel,
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
