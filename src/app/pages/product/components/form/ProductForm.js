import React from 'react';
// import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Card from 'antd/es/card';
import { Formik } from 'formik';
import { Form, FormItem, Input, InputNumber } from 'formik-antd';

import UnitsField from 'app/pages/product/components/form/UnitsField';
import UploadImageField from 'app/pages/product/components/form/UploadImagesField';

import CancelButton from '_core/components/CancelButton';
import SubmitButton from '_core/components/SubmitButton';

const ProductEditSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
  priceBaseUnit: Yup.number().required('This field is required.'),
  units: Yup.array().required('This field is required.'),
});

function ProductForm({ onSave, productItem, onCancel }) {
  return (
    <Card>
      <Formik
        initialValues={{
          ...productItem,
        }}
        enableReinitialize
        validateOnBlur
        validationSchema={ProductEditSchema}
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Name"
                name="name"
                hasFeedback
                showValidateSuccess
              >
                <Input name="name" />
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                name="priceBaseUnit"
                label="Price base on unit"
                hasFeedback
                showValidateSuccess
              >
                <InputNumber name="priceBaseUnit" style={{ width: '100%' }} />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Row gutter={16}>
                <Col span={24}>
                  <UploadImageField />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <FormItem name="remark" label="Remarks">
                    <Input.TextArea name="remark" rows="5" />
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <UnitsField />
            </Col>
          </Row>
          <FormItem name="action" style={{ float: 'right', marginTop: 16 }}>
            <CancelButton onClick={onCancel} />
            <SubmitButton />
          </FormItem>
        </Form>
      </Formik>
    </Card>
  );
}

// ProductForm.propTypes = {
//   saveProduct: PropTypes.func,
//   productItem: PropTypes.object,
//   onCancel: PropTypes.func,
// };
ProductForm.defaultProps = {};

export default ProductForm;
