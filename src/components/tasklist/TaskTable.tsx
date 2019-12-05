import React from 'react';
import { Tag } from 'antd';
import { Response } from '../../libs/API/tasklist';
import { ColumnProps } from 'antd/lib/table';

type TData = Response['data']['items'][0];

type TActions = (props: { data: TData }) => JSX.Element;

export const getColumns: <T extends TData>(
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
  { dataIndex: 'tasktype', title: '方式', key: 'tasktype', width: '5%' },
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

