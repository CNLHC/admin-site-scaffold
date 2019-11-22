import React, { useState, useCallback, useEffect, useMemo } from 'react';
import MainLayout from '../../components/Layout';
import {
  Response as FPStatResponse,
  APIGetRecogStat,
} from '../../libs/API/get_recog_stat';
import { message, Table } from 'antd';
import { GetColumns } from '../../components/Report/recognize';
import { withAuthCheck } from '../../libs/withCSRAuth';
type Data = FPStatResponse['data'][0];

function capture() {
  const [bench, setBench] = useState<Data[]>([]);
  const GetBenchResult = useCallback(
    () =>
      APIGetRecogStat(
        res => setBench(res.data.data),
        () => message.error('网络错误')
      ),
    []
  );
  useEffect(() => GetBenchResult(), []);
  const columns = useMemo(() => GetColumns(), []);

  return (
    <MainLayout>
      <Table columns={columns} dataSource={bench} />
    </MainLayout>
  );
}

export default withAuthCheck(capture);
