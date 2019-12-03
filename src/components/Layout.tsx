import React, { useState } from 'react';
import { Layout } from 'antd';
import axios from 'axios';
import SideBar from './SideBar';
import TopBar from './TopBar';
import ModalFormFPCAP from './create/fpcap';
const { Content } = Layout;

function MainLayout(props: {
  children?: React.ReactNode[] | React.ReactNode | React.ReactChild;
}) {
  const [collapse, setCollapse] = useState(false);
  const [fpcap, setFpcap] = useState(false);
  const [recog, setRecog] = useState(false);
  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <ModalFormFPCAP
        tasktype={['抓拍', 'FP']}
        onSubmit={e => console.log(Array.from(e.entries()))}
        modal={{
          title: '创建FP/抓拍任务',
          visible: fpcap,
          onOk: () => setFpcap(false),
          onCancel: () => setFpcap(false),
        }}
      />
      <ModalFormFPCAP
        tasktype={['G3', 'B2R', 'DEV', 'NVR', 'Pandaeye', '车牌']}
        onSubmit={e => console.log(Array.from(e.entries()))}
        modal={{
          title: '创建识别任务',
          visible: recog,
          onOk: () => setRecog(false),
          onCancel: () => setRecog(false),
        }}
      />

      <SideBar
        collapse={collapse}
        onCollapse={() => setCollapse(e => !e)}
        overrideOnClick={{
          createTaskFPCAP: () => setFpcap(true),
          createRecog: () => setRecog(true),
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
