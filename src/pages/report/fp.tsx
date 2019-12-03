import React, { useMemo, useState, useCallback, useEffect } from 'react';
import MainLayout from '../../components/Layout';
import { GetColumns } from '../../components/Report/fp';
import {
  Response,
  APIGetFPBenchmark,
  Request,
} from '../../libs/API/get_fp_benchmark';
import { Table, message } from 'antd';
import { withAuthCheck } from '../../libs/withCSRAuth';

function capture() {
  const [bench, setBench] = useState<Response['data']['items']>([]);
  const [count, setCount] = useState<number>(0);
  const [payload, setPayload] = useState<Request>({
    count: 10,
    offset: 0,
    taskids: [],
  });
  const columns = useMemo(() => GetColumns(), []);
  const GetFPBenchmark = useCallback(
    payload =>
      APIGetFPBenchmark(payload)
        .then(res => {
          setCount(res.data.data.total);
          setBench(res.data.data.items);
        })
        .catch(() => message.error('网络错误')),
    [payload]
  );
  useEffect(() => {
    GetFPBenchmark(payload);
  }, [payload]);

  return (
    <MainLayout>
      <Table
        columns={columns}
        rowKey={e => e.taskid.toString()}
        dataSource={bench}
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
      />
    </MainLayout>
  );
}
export default withAuthCheck(capture);
