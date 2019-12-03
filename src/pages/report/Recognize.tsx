import React, { useState, useCallback, useEffect, useMemo } from 'react';
import MainLayout from '../../components/Layout';
import _ from 'lodash';
import {
  Response as FPStatResponse,
  Request,
  APIGetRecogStat,
} from '../../libs/API/get_recog_stat';
import { message, Table } from 'antd';
import { GetColumns } from '../../components/Report/recognize';
import { withAuthCheck } from '../../libs/withCSRAuth';
import FPFilterPanel from '../../components/Report/recognize/panel';
type Data = FPStatResponse['data']['items'][0];

function capture() {
  const [bench, setBench] = useState<Data[]>([]);
  const [filteredBench, setFilteredBench] = useState<Data[]>([]);
  const [count, setCount] = useState(0);
  const [localFilter, setLocalfilter] = useState<{
    product: string[];
    version: string[];
    video: string[];
  }>({ product: [], version: [], video: [] });
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
  const product = Array.from(new Set(bench.map(e => e.product)));
  const video = Array.from(new Set(bench.map(e => e.video)));
  const version = Array.from(new Set(bench.map(e => e.version)));
  useMemo(() => {
    console.log(localFilter);
    setFilteredBench([
      ...bench
        .filter(
          e =>
            localFilter.product.length == 0 ||
            _.intersection([e.product], localFilter.product).length > 0
        )
        .filter(
          e =>
            localFilter.video.length == 0 ||
            _.intersection([e.video], localFilter.video).length > 0
        )
        .filter(
          e =>
            localFilter.version.length == 0 ||
            _.intersection([e.version], localFilter.version).length > 0
        ),
    ]);
  }, [localFilter, bench]);

  const columns = useMemo(() => GetColumns(), []);

  return (
    <MainLayout>
      <FPFilterPanel
        product={product}
        video={video}
        version={version}
        onChange={e => setLocalfilter(e)}
      />
      <Table
        columns={columns}
        rowKey={e => e.version + e.time + Math.random().toString(36)}
        dataSource={filteredBench}
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
