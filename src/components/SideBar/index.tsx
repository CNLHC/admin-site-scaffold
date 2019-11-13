import React from 'react';
import { Layout, Menu } from 'antd';
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
      return <Menu.Item key={route}>{e.title}</Menu.Item>;
    } else {
      return (
        <SubMenu key={route} title={e.title}>
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
