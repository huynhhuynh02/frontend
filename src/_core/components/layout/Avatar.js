import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Menu, Dropdown } from 'antd';
import { InfoCircleTwoTone, LogoutOutlined } from '@ant-design/icons';
import { selectUser } from '../../../app/modules/auth/pages/selectors';
import { logout } from '../../../app/modules/auth/pages/reducer';

const divStyle = {
  cursor: 'pointer',
};

const MyAvatar = () => {
  const user = useSelector(selectUser());
  const dispatch = useDispatch();

  function logoutClick() {
    dispatch(logout());
  }

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<InfoCircleTwoTone />}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={logoutClick}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <div style={divStyle}>
        <Avatar>{user.email.substr(0, 2).toUpperCase()}</Avatar>
      </div>
    </Dropdown>
  );
};

export default MyAvatar;
