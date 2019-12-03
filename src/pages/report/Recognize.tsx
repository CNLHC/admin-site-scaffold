import React, { useState, useCallback, useEffect, useMemo } from 'react';
import MainLayout from '../../components/Layout';
import {
  Response as FPStatResponse,
  Request,
  APIGetRecogStat,
} from '../../libs/API/get_recog_stat';
import { message, Table } from 'antd';
import { GetColumns } from '../../components/Report/recognize';
import { withAuthCheck } from '../../libs/withCSRAuth';
type Data = FPStatResponse['data']['items'][0];

function capture() {
  const [bench, setBench] = useState<Data[]>([]);
  const [count, setCount] = useState(0);
  const [payload, setPayload] = useState<Request>({
    count: 10,
    offset: 0,
  });
  const GetBenchResult = useCallback(
    payload =>
      APIGetRecogStat(payload)
        .then(res => {
          setBench(res.data.data.items);
          setCount(res.data.data.total);
        })
        .catch(() => message.error('网络错误')),
    [payload]
  );
  useEffect(() => {
    GetBenchResult(payload);
  }, [payload]);

  const columns = useMemo(() => GetColumns(), []);

  return (
    <MainLayout>
      <Table
        columns={columns}
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
