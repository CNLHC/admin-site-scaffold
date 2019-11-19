import React, { useMemo, useState, useCallback, useEffect } from 'react';
import MainLayout from '../../components/Layout';
import { GetColumns } from '../../components/Report/fp';
import {
  Response,
  APIGetFPBenchmark,
  Request,
} from '../../libs/API/get_fp_benchmark';
import { Table, message } from 'antd';
type Data = Response['data'][0];

export default function capture() {
  const [bench, setBench] = useState<Data[]>([]);
  const [payload, setPayload] = useState<Request>({ taskids: [] });
  const columns = useMemo(() => GetColumns(), []);
  const GetFPBenchmark = useCallback(
    payload =>
      APIGetFPBenchmark(
        payload,
        res => setBench(res.data.data),
        () => message.error('网络错误')
      ),
    [payload]
  );
  useEffect(() => GetFPBenchmark(payload), [payload]);

  return (
    <MainLayout>
      <Table columns={columns} dataSource={bench} />
    </MainLayout>
  );
}
