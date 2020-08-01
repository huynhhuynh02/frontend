import React from 'react';
import styled from 'styled-components';

import { Button, Space } from 'antd';
import { Input, FormItem } from 'formik-antd';
import { useFormikContext } from 'formik';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { pure } from 'recompose';

const SpaceWrapper = styled(Space)`
  .ant-space-item {
    width: 100%;
  }
`;

const UnitsField = () => {
  const formikContext = useFormikContext();
  const { units = [] } = formikContext.values;

  const add = () => {
    formikContext.setFieldValue('units', [...units, { name: '', rate: 1 }]);
  };

  const remove = index => {
    const deleteUnits = units.filter((u, i) => i !== index);
    formikContext.setFieldValue('units', [...deleteUnits]);
  };
  const getKey = index => `units[${index}]`;
  return (
    <FormItem name="units" label="Units" hasFeedback showValidateSuccess>
      {units.map((field, index) => (
        <SpaceWrapper
          key={getKey(index)}
          style={{ display: 'flex', marginBottom: 8 }}
          size="large"
          align="start"
        >
          <FormItem
            name={`units[${index}].name`}
            hasFeedback
            showValidateSuccess
          >
            <Input name={`units[${index}].name`} placeholder="Name" />
          </FormItem>

          <FormItem
            name={`units[${index}].rate`}
            hasFeedback
            showValidateSuccess
          >
            <Input name={`units[${index}].rate`} placeholder="Rate" />
          </FormItem>

          <MinusCircleOutlined
            onClick={() => {
              remove(index);
            }}
          />
        </SpaceWrapper>
      ))}

      <FormItem name="unitsAction">
        <Button
          type="dashed"
          onClick={() => {
            add();
          }}
          block
        >
          <PlusOutlined /> Add Unit
        </Button>
      </FormItem>
    </FormItem>
  );
};

export default pure(UnitsField);
