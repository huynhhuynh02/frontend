import React from 'react';
import Tooltip from 'antd/es/tooltip';
import Button from 'antd/es/button';
import DeleteIcon from '@ant-design/icons/lib/icons/DeleteOutlined';
import EditIcon from '@ant-design/icons/lib/icons/EditOutlined';

export const SimpleTableAction = ({ onDelete, onEdit, isShow }) =>
  isShow && (
    <div style={{ textAlign: 'center' }}>
      <Tooltip title="Delete">
        <Button
          size="small"
          onClick={onDelete}
          type="danger"
          icon={<DeleteIcon />}
        />
        <Button
          size="small"
          onClick={onEdit}
          type="primary"
          icon={<EditIcon />}
        />
      </Tooltip>
    </div>
  );
