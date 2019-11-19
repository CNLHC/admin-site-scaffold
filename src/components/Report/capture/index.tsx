import React, { useMemo } from 'react';
import Table, { ColumnProps } from 'antd/lib/table';

import { Response } from '../../../libs/API/get_benchmark';
type Data = Response['data']['items'][0];

const GetColumns: () => ColumnProps<Data>[] = () => [
  //   { dataIndex: 'taskid', title: '任务i', key: 'taskidd' },
  {
    dataIndex: 'taskname',
    title: '任务名称',
    key: 'taskname',
    width: '15%',
    ellipsis: true,
  },
  { dataIndex: 'tasktime', title: '任务时间 ', key: 'tasktime' },
  { dataIndex: 'tasktype', title: '任务类型 ', key: 'tasktype' },
  { dataIndex: 'taskversion', title: '任务版本 ', key: 'taskversion' },
  { dataIndex: 'videoname', title: '视频名称 ', key: 'videoname' },
  { dataIndex: 'basenum', title: '标注底库 ', key: 'basenum' },
  { dataIndex: 'caprate', title: '抓排率 ', key: 'caprate' },
  { dataIndex: 'capturenum', title: '推图总数 ', key: 'capturenum' },
  { dataIndex: 'duenum', title: '重复数 ', key: 'duenum' },
  { dataIndex: 'duerate', title: '重复率 ', key: 'duerate' },
  { dataIndex: 'eftfacenum', title: '有效face数', key: 'eftnumace' },
  { dataIndex: 'fpnum', title: '误拍数 ', key: 'fpnum' },
  { dataIndex: 'fprate', title: '误拍率 ', key: 'fprate' },
  { dataIndex: 'missnum', title: '错误数 ', key: 'missnum' },
  { dataIndex: 'product', title: '产品 ', key: 'product' },
];

interface Props {
  data: Data[];
}

export default function CaptureTable({ data }: Props) {
  const Columns = useMemo(() => GetColumns(), []);
  return (
    <Table
      columns={Columns}
      dataSource={data}
      rowKey={e => e.taskid.toString()}
    />
  );
}
