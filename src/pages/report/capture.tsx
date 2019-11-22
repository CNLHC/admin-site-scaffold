import React, { useState, useMemo, useEffect, useCallback } from 'react';
import MainLayout from '../../components/Layout';
import {
  Response as BenchmarkResponse,
  Request as BenchmarkRequest,
  APIGetBenchmark,
} from '../../libs/API/get_benchmark';
import CaptureTable from '../../components/Report/capture';
import { message } from 'antd';
import { withAuthCheck } from '../../libs/withCSRAuth';
type Data = BenchmarkResponse['data']['items'][0];

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
  useEffect(() => GetBenchmark(payload), []);

  return (
    <MainLayout>
      <CaptureTable data={benchmark} />
    </MainLayout>
  );
}

export default withAuthCheck(capture);
