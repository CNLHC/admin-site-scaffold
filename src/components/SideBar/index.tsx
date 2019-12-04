import React, { useMemo, useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { TMenuItem } from '../../libs/types/menu';
import MenuData from '../../libs/constant/menu';
import Route, { useRouter } from 'next/router';

const { Sider } = Layout;
const { SubMenu } = Menu;

const searchRouteItem = (
  ingredients: string[],
  menu: TMenuItem[],
  openCumu: string[] = []
) => {
  const first = ingredients.shift();
  if (first) {
    const Idx = menu.find(e => e.route === first);
    if (Idx !== undefined) {
      if (Idx.childItem.length > 0) {
        openCumu.push(`${Idx.key}`);
        return searchRouteItem(ingredients, Idx.childItem);
      } else return `${Idx.key}`;
    } else {
      return ``;
    }
  } else return '';
};

const generateMenu = (
  menu: TMenuItem[],
  base = '/',
  overrideOnClick: { [key: string]: () => void } = {}
) => {
  return menu.map(e => {
    const route = `${base}${e.route}/`;
    const routeNoTrailing = `${base}${e.route}`;
    if (e.childItem.length == 0) {
      return (
        <Menu.Item
          key={e.key}
          onClick={() => {
            if (e.route.length > 0) Route.push(routeNoTrailing);
            else if (typeof overrideOnClick[e.key] === 'function') {
              overrideOnClick[e.key]();
            } else {
            }
          }}
        >
          <span>
            {e.icon ? <Icon type={e.icon} /> : null}
            <span>{e.title}</span>
          </span>
        </Menu.Item>
      );
    } else {
      return (
        <SubMenu
          key={e.key}
          title={
            <span>
              {e.icon ? <Icon type={e.icon} /> : null}
              <span>{e.title}</span>
            </span>
          }
        >
          {generateMenu(e.childItem, route, overrideOnClick)}
        </SubMenu>
      );
    }
  });
};

interface TProps {
  collapse: boolean;
  onCollapse: () => void;
  overrideOnClick?: { [key: string]: () => void };
}

export default (function SideBar({
  collapse,
  overrideOnClick,
  onCollapse,
}: TProps) {
  const [open, setOpen] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const router = useRouter();
  useMemo(() => {
    if (!collapse) {
      const openCumu: string[] = [];
      const select = searchRouteItem(
        router.pathname.split('/').filter(e => e.length > 0),
        MenuData,
        openCumu
      );
      setSelected(select);
      setOpen(e => [...e, ...openCumu]);
    } else {
      setOpen(e => []);
    }
  }, [router, collapse]);
  const MenuChild = useMemo(
    () => generateMenu(MenuData, '/', overrideOnClick),
    []
  );

  return (
    <Sider collapsible collapsed={collapse} onCollapse={onCollapse}>
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
        <div style={{ padding: '0.5em' }}>{collapse ? 'FAST' : 'FASTEVAL'}</div>
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
