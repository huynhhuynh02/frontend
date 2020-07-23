import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import { useFormik } from 'formik';
import Button from 'antd/es/button';

const { Item } = Form;

const InventoryWarehouseEditSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
});

function InventoryWarehouseForm({ onSave, inventoryWarehouseItem, onCancel }) {
  const formik = useFormik({
    initialValues: {
      ...inventoryWarehouseItem,
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: InventoryWarehouseEditSchema,
    onSubmit: values => {
      onSave(values);
    },
  });

  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  const validateField = (field, hasFeedback = true) => ({
    validateStatus: errors[field] && touched[field] ? 'error' : '',
    help: errors[field] && touched[field] ? errors[field] : '',
    hasFeedback,
  });
  return (
    <Form layout="horizontal" onSubmit={formik.handleSubmit}>
      <Item label="Name" colon={false} {...validateField('name')}>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          size="large"
        />
      </Item>

      <Item
        style={{
          textAlign: 'right',
          paddingTop: '0.5rem',
        }}
      >
        <Button type="primary" size="large" ghost onClick={onCancel}>
          Cancel
        </Button>
        <Button
          size="large"
          type="primary"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Item>
    </Form>
  );
}

InventoryWarehouseForm.propTypes = {
  saveInventoryWarehouse: PropTypes.func,
  inventoryWarehouseItem: PropTypes.object,
  onCancel: PropTypes.func,
};
InventoryWarehouseForm.defaultProps = {};

export default InventoryWarehouseForm;
