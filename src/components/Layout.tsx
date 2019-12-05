import React, { useState } from 'react';
import { Layout, message } from 'antd';
import axios from 'axios';
import SideBar from './SideBar';
import TopBar from './TopBar';
import ModalFormFPCAP from './create/fpcap';
import { APICreateTask } from '../libs/API/create_task';
import ModalFormRecog from './create/recog';
import { APICreateRecogTask } from '../libs/API/create_recog_task';
import { useRouter } from 'next/router';
const { Content } = Layout;

function MainLayout(props: {
  children?: React.ReactNode[] | React.ReactNode | React.ReactChild;
}) {
  const [collapse, setCollapse] = useState(false);
  const [fpcap, setFpcap] = useState(false);
  const [recog, setRecog] = useState(false);
  const router = useRouter();

  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <ModalFormFPCAP
        tasktype={['抓拍', 'FP']}
        onSubmit={e => {
          APICreateTask(e)
            .then(() => {
              message.success('创建成功');
              router.replace('/tasklist');
              setFpcap(false);
            })
            .catch(() => message.error('创建失败'));
        }}
        modal={{
          title: '创建FP/抓拍任务',
          visible: fpcap,
          onOk: () => setFpcap(false),
          onCancel: () => setFpcap(false),
        }}
      />
      <ModalFormRecog
        tasktype={['G3', 'B2R', 'DEV', 'NVR', 'Pandaeye', '车牌']}
        onSubmit={e => {
          APICreateRecogTask(e)
            .then(() => {
              message.success('创建成功');
              setRecog(false);
              router.replace('/tasklist');
            })
            .catch(() => message.error('创建失败'));
        }}
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
