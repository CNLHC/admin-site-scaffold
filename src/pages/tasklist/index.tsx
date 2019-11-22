import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout';
import TaskTable from '../../components/tasklist/TaskTable';
import { Response, Request, Route as TaskAPI } from '../../libs/API/tasklist';
import Axios from 'axios';
import FilterPanel from '../../components/tasklist/FilterPanel';
import {
  Response as TProdRep,
  Route as ProdAPI,
} from '../../libs/API/get_products';
import {
  Response as TVersionResp,
  Route as VersionAPI,
} from '../../libs/API/filter_testversions';
import {
  Response as TVideoResp,
  Route as VideoAPI,
} from '../../libs/API/get_video';
import { withAuthCheck } from '../../libs/withCSRAuth';

const RootLayout = styled(MainLayout)``;

function Page() {
  const [pagination, setPagination] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 1,
    pageSize: 10,
  });

  const [taskResp, setTaskResp] = useState<Response['data']>({
    items: [],
    total: 0,
  });

  const [prodResp, setProdResp] = useState<TProdRep>({
    code: 0,
    data: [],
  });
  const [versionResp, setVersionResp] = useState<TVersionResp>({
    code: 0,
    data: [],
  });
  const [videoResp, setVideoResp] = useState<TVideoResp>({
    code: 0,
    data: [],
  });

  const [products, setProducts] = useState<TProdRep['data']>([]);

  const [taskReq, setTaskReq] = useState<Request>({
    count: pagination.pageSize,
    offset: (pagination.page - 1) * pagination.pageSize,
    product: [],
    taskname: ' ',
    version: [],
    video: [],
  });

  useEffect(() => {
    Axios.post<Response>(TaskAPI, taskReq).then(res =>
      setTaskResp(res.data.data)
    );
  }, [taskReq]);

  useEffect(() => {
    Axios.get<TVideoResp>(VideoAPI).then(res => setVideoResp(res.data));
  }, []);

  useEffect(() => {
    Axios.get<TProdRep>(ProdAPI).then(res => setProdResp(res.data));
  }, []);

  useEffect(() => {
    Axios.post<TVersionResp>(VersionAPI, {
      product: products,
    }).then(res => setVersionResp(res.data));
  }, [products]);

  return (
    <RootLayout>
      <FilterPanel
        products={prodResp}
        videos={videoResp}
        versions={versionResp}
        onFilterChange={model => {
          setProducts(model.product);
          setTaskReq(e => ({
            ...e,
            ...model,
          }));
        }}
      />
      <div>
        <TaskTable
          data={taskResp}
          delete={payload => console.log(payload)}
          onPageChange={(page, pageSize) => {
            setTaskReq(e => ({
              ...e,
              count: pageSize,
              offset: (page - 1) * pageSize,
            }));
            setPagination({ page, pageSize });
          }}
          pagination={pagination}
        />
      </div>
    </RootLayout>
  );
}

export default withAuthCheck(Page);
