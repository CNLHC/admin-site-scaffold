import React from 'react';
import { Layout, Button, Popconfirm, message, Modal } from 'antd';
import styled from 'styled-components';
import { AuthPost } from '../../libs/auth/method';
import { logout } from '../../libs/API/session';
import Router from 'next/router';
const { confirm } = Modal;

const { Header } = Layout;
const Root = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;

  padding: 0 1rem;
`;

const TopBar = () => {
  return (
    <Header style={{ background: '#fff', padding: 0 }}>
      <Root>
        <Button
          icon="logout"
          onClick={() =>
            confirm({
              title: '确认退出?',
              onCancel: () => {},
              onOk: () => {
                logout()
                  .then(() => {
                    sessionStorage.removeItem('jwt')
                    return Router.replace('/login');
                  })
                  .catch(() => message.error('网络错误'));
              },
            })
          }
        />
      </Root>
    </Header>
  );
};

export default TopBar;
