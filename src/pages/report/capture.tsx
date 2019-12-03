import React, { useState, useMemo, useEffect, useCallback } from 'react';
import MainLayout from '../../components/Layout';
import {
  Response as BenchmarkResponse,
  Request as BenchmarkRequest,
  APIGetBenchmark,
} from '../../libs/API/get_benchmark';
import TestVerisionFilterPanel, {
  GetColumns,
} from '../../components/Report/capture';
import { message, Table, Button } from 'antd';
import { withAuthCheck } from '../../libs/withCSRAuth';
import { withRedux } from '../../libs/withRedux';
import { CSVLink } from 'react-csv';
import styled from 'styled-components';

type Data = BenchmarkResponse['data']['items'][0];
const Header = [
  '测试创建时间',
  '测试名字',
  '产品',
  '测试版本',
  '测试视频',
  '标注底库数',
  '推图总数',
  '有效face数',
  '误拍数',
  '漏拍数',
  '重复数',
  '抓拍率',
  '误抓率',
  '重复率',
];

const Hbox = styled.div`
  display: flex;
  justify-content: flex-start;
`;
function capture() {
  const [benchmark, setBenchmark] = useState<Data[]>([]);
  const [count, setCounts] = useState<number>(0);
  const [payload, setPayload] = useState<BenchmarkRequest>({
    taskid: [],
    count: 10,
    offset: 0,
    product: [],
    version: [],
    video: [],
  });
  const [selected, setSelected] = useState<Data[]>([]);
  const GetBenchmark = useCallback(
    (payload: BenchmarkRequest) =>
      APIGetBenchmark(
        payload,
        res => {
          setBenchmark(res.data.data.items);
          setCounts(res.data.data.total);
        },
        () => message.error('网络错误')
      ),
    []
  );
  useEffect(() => GetBenchmark(payload), [payload]);

  return (
    <MainLayout>
      <Hbox>
        <Button
          type={'primary'}
          disabled={selected.length === 0}
          style={{ marginRight: '1em' }}
        >
          <CSVLink data={selected}>导出到CSV</CSVLink>
        </Button>
        <TestVerisionFilterPanel
          onChange={v => setPayload(e => ({ ...e, ...v }))}
        />
      </Hbox>
      <Table
        columns={GetColumns()}
        dataSource={benchmark}
        pagination={{
          total: count,
          showSizeChanger: true,
          defaultPageSize: 10,
          onShowSizeChange: (_, size) =>
            setPayload(e => ({
              ...e,
              count: size,
              offset: 0,
            })),
          onChange: (page, pageSize) =>
            setPayload(e => ({
              ...e,
              count: pageSize,
              offset: (page - 1) * pageSize,
            })),
        }}
        rowKey={e => e.taskid.toString()}
        rowSelection={{
          onChange: (v, k) => {
            console.log(k);
            return setSelected(k);
          },
        }}
      />
    </MainLayout>
  );
}

export default withAuthCheck(withRedux(capture));
