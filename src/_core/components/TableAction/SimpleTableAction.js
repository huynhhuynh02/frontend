import React from 'react';
import Tooltip from 'antd/es/tooltip';
import DeleteIcon from '@ant-design/icons/lib/icons/DeleteOutlined';
import { Space } from 'antd';
import EditButton from '_core/components/EditButton';
import DeleteButton from '_core/components/DeleteButton';

export const SimpleTableAction = ({ onDelete, onEdit, isShow }) =>
  isShow && (
    <Space>
      <Tooltip title="Delete">
        <DeleteButton
          size="small"
          onClick={onDelete}
          type="danger"
          icon={<DeleteIcon />}
        />
      </Tooltip>
      <Tooltip title="Delete">
        <EditButton onClick={onEdit} />
      </Tooltip>
    </Space>
  );
