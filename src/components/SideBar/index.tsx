import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { TMenuItem } from '../../libs/types/menu';
import MenuData from '../../libs/constant/menu';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface TProps {
  collapse: boolean;
  onCollapse: () => void;
}

const generateMenu = (menu: TMenuItem[], base = '/') => {
  return menu.map(e => {
    const route = `${base}${e.route}/`;
    if (e.childItem.length == 0) {
      return (
        <Menu.Item key={route}>
          {e.icon ? <Icon type={e.icon} /> : null}
          <span>{e.title}</span>
        </Menu.Item>
      );
    } else {
      return (
        <SubMenu
          key={route}
          title={
            <span>
              {e.icon ? <Icon type={e.icon} /> : null}
              <span>{e.title}</span>
            </span>
          }
        >
          {generateMenu(e.childItem, route)}
        </SubMenu>
      );
    }
  });
};

export default function SideBar(props: TProps) {
  return (
    <Sider collapsible collapsed={props.collapse} onCollapse={props.onCollapse}>
      <div
        className="LogoArea"
        style={{
          height: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#FFF',
          fontSize: '18pt',
        }}
      >
        <div style={{ padding: '0.5em' }}>DEMO</div>
      </div>

      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        {generateMenu(MenuData)}
      </Menu>
    </Sider>
  );
}
