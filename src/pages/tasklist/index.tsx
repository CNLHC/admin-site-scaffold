import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout';
import { getColumns } from '../../components/tasklist/TaskTable';
import { Response, Request, Route as TaskAPI } from '../../libs/API/tasklist';
import Axios from 'axios';
import FilterPanel from '../../components/tasklist/FilterPanel';
import {
  Response as TProdRep,
  Route as ProdAPI,
} from '../../libs/API/get_products';
import {
  Response as TVersionResp,
  Route as VersionAPI,
} from '../../libs/API/filter_testversions';
import {
  Response as TVideoResp,
  Route as VideoAPI,
} from '../../libs/API/get_video';
import { withAuthCheck } from '../../libs/withCSRAuth';
import { Button, Table, Form, Modal, Input, message } from 'antd';
import { withRedux } from '../../libs/withRedux';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../libs/store';
import { ACTGetProducts } from '../../libs/state/basic';
import { useRouter } from 'next/router';
import { APIDeleteTasks } from '../../libs/API/delete_task';
import { APICreateRecogTask } from '../../libs/API/create_recog_task';
import ModalFormRecog from '../../components/create/recog';
import ModalFormFPCAP from '../../components/create/fpcap';
import { APICreateTask } from '../../libs/API/create_task';

type TData = Response['data']['items'][0];

const RootLayout = styled(MainLayout)``;
type TActions = (props: { data: TData }) => JSX.Element;
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
`;
const HBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
`;

function Page() {
  const dispatch = useDispatch();
  const products = useTypedSelector(e => e.BasicInfoReducer.products);
  const [taskResp, setTaskResp] = useState<Response['data']>({
    items: [],
    total: 0,
  });
  const [selected, setSelected] = useState<Response['data']['items']>([]);
  const [versionResp, setVersionResp] = useState<TVersionResp['data']>([]);
  const [videoResp, setVideoResp] = useState<TVideoResp['data']>([]);
  const [taskReq, setTaskReq] = useState<Request>({
    count: 10,
    offset: 0,
    product: [],
    taskname: '',
    version: [],
    video: [],
  });
  const UpdateTaskList = () =>
    Axios.post<Response>(TaskAPI, taskReq).then(res =>
      setTaskResp(res.data.data)
    );

  useEffect(() => {
    UpdateTaskList();
  }, [taskReq]);

  useEffect(() => {
    let handle = setInterval(() => UpdateTaskList(), 5000);
    return () => {
      clearInterval(handle);
    };
  }, [taskReq]);

  useEffect(() => {
    Axios.get<TProdRep>(ProdAPI).then(res =>
      dispatch(ACTGetProducts(res.data.data))
    );
    Axios.get<TVideoResp>(VideoAPI).then(res => setVideoResp(res.data.data));
  }, []);

  useEffect(() => {
    if (products && products.length > 0)
      Axios.post<TVersionResp>(VersionAPI, {
        product: products,
      }).then(res => setVersionResp(res.data.data));
  }, [products]);

  const router = useRouter();

  const Actions: TActions = props => {
    switch (props.data.tasktype) {
      case '识别':
        return (
          <ButtonBox>
            <Button
              type={'primary'}
              onClick={() =>
                router.push(`/tasklist/RecogLabel?id=${props.data.taskid}`)
              }
            >
              识别标注
            </Button>
          </ButtonBox>
        );
      case 'fp':
        return (
          <ButtonBox>
            <Button
              type={'primary'}
              onClick={() =>
                router.push(`/tasklist/fp?id=${props.data.taskid}`)
              }
            >
              FP标注
            </Button>
            <Button
              onClick={() =>
                router.push(`/tasklist/check?id=${props.data.taskid}`)
              }
            >
              检查
            </Button>
          </ButtonBox>
        );
      default:
        return (
          <ButtonBox>
            <Button
              type={'primary'}
              onClick={() =>
                router.push(`/tasklist/fp?id=${props.data.taskid}`)
              }
            >
              FP标注
            </Button>
            <Button
              onClick={() =>
                router.push(`/tasklist/label?id=${props.data.taskid}`)
              }
            >
              标注
            </Button>
            <Button
              style={{ background: '#389e0d', color: '#fff' }}
              onClick={() =>
                router.push(`/tasklist/check?id=${props.data.taskid}`)
              }
            >
              检查
            </Button>
          </ButtonBox>
        );
    }
  };

  const columns = getColumns(Actions);
  const [deleteModal, setDeleteModal] = useState(false);

  const [fpcap, setFpcap] = useState(false);
  const [recog, setRecog] = useState(false);

  const [fakepass, setFakePass] = useState('');

  return (
    <RootLayout>
      <ModalFormFPCAP
        tasktype={['抓拍', 'FP']}
        onSubmit={e => {
          APICreateTask(e)
            .then(() => {
              message.success('创建成功');
              UpdateTaskList();
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
              UpdateTaskList();
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
      <Modal
        title="输入密码确认删除"
        visible={deleteModal}
        onOk={() => {
          APIDeleteTasks({
            tasks: selected.map(e => e.taskid),
            token: fakepass,
          })
            .then(res => {
              if (res.data.code < 300) {
                UpdateTaskList();
                setDeleteModal(false);
                setFakePass('');
              } else {
                message.error('删除失败');
                setDeleteModal(false);
                setFakePass('');
              }
            })
            .catch(() => {
              message.error('网络错误');
              setDeleteModal(false);
              setFakePass('');
            });
        }}
        onCancel={() => setDeleteModal(false)}
        okText="确认"
        cancelText="取消"
      >
        <Input
          value={fakepass}
          onChange={e => setFakePass(e.target.value)}
        ></Input>
      </Modal>

      <FilterPanel
        products={products}
        videos={videoResp}
        versions={versionResp}
        onFilterChange={model => {
          setTaskReq(e => ({
            ...e,
            ...model,
          }));
        }}
      />
      <HBox style={{ marginTop: '1.5rem' }}>
        <Button
          onClick={() => setDeleteModal(true)}
          type="danger"
          disabled={selected.length === 0}
          style={{ marginRight: '1.5rem', marginBottom: '1rem' }}
        >
          删除
        </Button>
        <Button.Group>
          <Button
            icon={'plus-circle'}
            type={'primary'}
            onClick={() => setFpcap(true)}
          >
            新建FP/抓拍任务
          </Button>
          <Button
            icon={'plus-circle'}
            type={'primary'}
            onClick={() => setRecog(true)}
          >
            新建识别任务
          </Button>
        </Button.Group>
      </HBox>
      <Table
        rowKey={r => r.taskid.toString()}
        columns={columns}
        dataSource={taskResp.items}
        rowSelection={{
          onChange: (_keys, selected) => setSelected(selected),
        }}
        pagination={{
          pageSize: taskReq.count,
          current: taskReq.offset / taskReq.count + 1,
          total: taskResp.total,
          showQuickJumper: true,
          showSizeChanger: true,
          onShowSizeChange: (_cur, np) => {
            setTaskReq(e => ({
              ...e,
              count: np,
              offset: 0,
            }));
          },
          onChange: (page, pageSize) => {
            setTaskReq(e => ({
              ...e,
              count: pageSize,
              offset: (page - 1) * pageSize,
            }));
          },
        }}
      />
    </RootLayout>
  );
}

export default withRedux(withAuthCheck(Page));
