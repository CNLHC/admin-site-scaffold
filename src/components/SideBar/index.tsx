import React, { useMemo, useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { TMenuItem } from '../../libs/types/menu';
import MenuData from '../../libs/constant/menu';
import Route, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface TProps extends WithRouterProps {
  collapse: boolean;
  onCollapse: () => void;
}
const searchRouteItem = (
  ingredients: string[],
  menu: TMenuItem[],
  cumulative = '/',
  openCumu: string[] = []
) => {
  const first = ingredients.shift();
  if (first) {
    const Idx = menu.find(e => e.route === first);
    if (Idx !== undefined) {
      if (Idx.childItem.length > 0) openCumu.push(`${cumulative}${Idx.route}/`);
      return searchRouteItem(
        ingredients,
        Idx.childItem,
        (cumulative = `${cumulative}${Idx.route}/`)
      );
    } else {
      return `${cumulative}`;
    }
  } else return cumulative;
};

const generateMenu = (menu: TMenuItem[], base = '/') => {
  return menu.map(e => {
    const route = `${base}${e.route}/`;
    const routeNoTrailing = `${base}${e.route}`;
    if (e.childItem.length == 0) {
      return (
        <Menu.Item key={route} onClick={() => Route.push(routeNoTrailing)}>
          <span>
            {e.icon ? <Icon type={e.icon} /> : null}
            <span>{e.title}</span>
          </span>
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

export default withRouter<TProps>(function SideBar(props) {
  const [open, setOpen] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  useMemo(() => {
    const openCumu: string[] = [];
    const select = props.router
      ? searchRouteItem(
          props.router.pathname.split('/').filter(e => e.length > 0),
          MenuData,
          '/',
          openCumu
        )
      : [''];

    setSelected(select);
    setOpen(e => [...e, ...openCumu]);
  }, [props.router]);
  const MenuChild = useMemo(() => generateMenu(MenuData), []);

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

      <Menu
        theme="dark"
        openKeys={open}
        selectedKeys={[selected]}
        mode="inline"
        onOpenChange={e => setOpen([...e])}
      >
        {MenuChild}
      </Menu>
    </Sider>
  );
});
