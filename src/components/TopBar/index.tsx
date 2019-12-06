import React from 'react';
import {
  Layout,
  Button,
  Popconfirm,
  message,
  Modal,
  Menu,
  Icon,
  Dropdown,
  Popover,
} from 'antd';
import styled from 'styled-components';
import { AuthPost } from '../../libs/auth/method';
import { logout } from '../../libs/API/session';
import _ from 'lodash';
import Router, { useRouter } from 'next/router';
import ModalFormGridSetting from './GridModalForm';
import { useTypedSelector } from '../../libs/store';
import { useDispatch } from 'react-redux';
import { ACTSetGrid } from '../../libs/state/grid';
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

const Plugin = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-grow: 1;
`;

const TopBar = () => {
  const router = useRouter();
  console.log(router.pathname);
  const haveGrid = () =>
    router &&
    _.intersection(
      [router.pathname],
      [
        '/tasklist/check',
        '/tasklist/fp',
        '/tasklist/label',
        '/tasklist/RecogLabel',
      ]
    ).length > 0;
  const GridSetting = useTypedSelector(e => e.GridSettingReducer);
  const dispatch = useDispatch();

  return (
    <Header style={{ background: '#fff', padding: 0 }}>
      <Root>
        {haveGrid() ? (
          <Plugin>
            <Popover
              placement="bottomLeft"
              content={
                <ModalFormGridSetting
                  settings={GridSetting}
                  onChange={e => dispatch(ACTSetGrid(e))}
                />
              }
            >
              <Button>
                <Icon type="setting" />
                网格设置
              </Button>
            </Popover>
          </Plugin>
        ) : null}

        <Button
          icon="logout"
          onClick={() =>
            confirm({
              title: '确认退出?',
              onCancel: () => {},
              onOk: () => {
                logout()
                  .then(() => {
                    sessionStorage.removeItem('jwt');
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
