import React, { useState } from 'react';
import { Table, Button, Tag } from 'antd';
import { Response } from '../../libs/API/tasklist';
import { Request as DeleteReq } from '../../libs/API/delete_task';
import { ColumnProps } from 'antd/lib/table';
import styled from 'styled-components';
import { useRouter } from 'next/router';

type TData = Response['data']['items'][0];

type TActions = (props: { data: TData }) => JSX.Element;

const getColumns: <T extends TData>(
  e: TActions
) => ColumnProps<T>[] = Actions => [
  { dataIndex: 'tasktime', title: '测试时间', key: 'tasktime', width: '10%' },
  {
    dataIndex: 'taskname',
    title: '测试名称',
    key: 'taskname',
    ellipsis: true,
    width: '15%',
  },
  { dataIndex: 'tasktype', title: '测试方式', key: 'tasktype', width: '10%' },
  {
    dataIndex: 'taskversion',
    title: '测试版本',
    key: 'taskversion',
    width: '15%',
    ellipsis: true,
  },
  {
    dataIndex: 'productname',
    title: '产品',
    key: 'productname',
    width: '5%',
    ellipsis: true,
  },
  {
    dataIndex: 'videoname',
    title: '视频流',
    key: 'videoname',
    width: '10%',
    align: 'center',
    ellipsis: true,
  },
  {
    dataIndex: 'basename',
    title: '底库',
    key: 'basename',
    width: '10%',

    ellipsis: true,
    align: 'center',
  },
  {
    dataIndex: 'taskstatus',
    title: '任务状态',
    key: 'taskstatus',
    width: '8%',
    render: text => <Tag color={'green'}>{text}</Tag>,
    align: 'center',
  },
  {
    dataIndex: 'actions',
    title: '操作',
    key: 'actions',
    render: (_text, record) => <Actions data={record} />,
  },
];

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

interface Props {
  data: Response['data'];
  delete: (payload: DeleteReq) => void;
  onPageChange: (page: number, pageSize: number) => void;
  pagination: {
    page: number;
    pageSize: number;
  };
}

export default function TaskTable(props: Props) {
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
            <Button>检查</Button>
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
            <Button style={{ background: '#389e0d', color: '#fff' }}>
              检查
            </Button>
          </ButtonBox>
        );
    }
  };
  const { data, pagination } = props;

  const columns = getColumns(Actions);
  return (
    <Table
      rowKey={r => r.taskid.toString()}
      columns={columns}
      dataSource={data.items}
      pagination={{
        pageSize: pagination.pageSize,
        current: pagination.page,
        total: data.total,
        onChange: (page, pageSize) => props.onPageChange(page, pageSize),
      }}
    />
  );
}
