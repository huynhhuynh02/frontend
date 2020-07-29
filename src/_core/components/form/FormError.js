import React from 'react';
import PropTypes from 'prop-types';
import { List, Typography } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

const DivStyle = styled.div`
  text-align: center;
  padding: 20px;
`;

function FormError(props) {
  let content;

  // If we have items, render them
  if (props.errors) {
    content = props.errors.map(item => (
      <List.Item
        key={`${item.name}_${item.code}`}
        style={{ justifyContent: 'center' }}
      >
        <Text type="danger">
          {item.code} - {item.message}
        </Text>
      </List.Item>
    ));
  }

  return !(props.errors && props.errors.length) ? (
    ''
  ) : (
    <DivStyle>
      <List size="small">{content}</List>
    </DivStyle>
  );
}

FormError.propTypes = {
  errors: PropTypes.array,
};

export default FormError;
