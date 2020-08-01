import React from 'react';
import PropTypes from 'prop-types';
import Space from 'antd/es/space';
import Button from 'antd/es/button';
import { EditFilled, EyeFilled, DeleteFilled } from '@ant-design/icons';
import * as _ from 'lodash';

const ActionColumn = props => {
  const buttons = [];
  if (_.isFunction(props.onView)) {
    buttons.push(<Button icon={<EyeFilled />} type="primary" />);
  }
  if (_.isFunction(props.onEdit)) {
    buttons.push(<Button icon={<EditFilled />} type="warning" />);
  }
  if (_.isFunction(props.onDelete)) {
    buttons.push(<Button icon={<DeleteFilled />} type="primary" danger />);
  }
  if (_.isArray(props.buttons)) {
    props.buttons.forEach(t => buttons.push(t));
  }
  return <Space>{buttons}</Space>;
};

ActionColumn.propTypes = {
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onDelete: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.element),
};

export default ActionColumn;
