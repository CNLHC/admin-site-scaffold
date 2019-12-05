import React, { useState } from 'react';
import { Layout } from 'antd';
import SideBar from './SideBar';
import TopBar from './TopBar';
const { Content } = Layout;

function MainLayout(props: {
  children?: React.ReactNode[] | React.ReactNode | React.ReactChild;
}) {
  const [collapse, setCollapse] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>

      <SideBar
        collapse={collapse}
        onCollapse={() => setCollapse(e => !e)}
        overrideOnClick={{
        }}
      />
      <Layout>
        <TopBar />
        <Content
          style={{
            margin: '1em',
            background: '#FFF',
            padding: '1em',
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
