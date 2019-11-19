import React, { useState, useEffect, useMemo, useCallback } from 'react';
import MainLayout from '../../components/Layout';
import Axios from 'axios';
import {
  Route as VersionAPI,
  Response as VersionResponse,
} from '../../libs/API/versionlist';
import { Response as ProdResponse } from '../../libs/API/productlist';
import getEditableTable, {
  TActions,
} from '../../components/Common/EdiableTable';
import styled from 'styled-components';
import { Button, Form, message, Popconfirm, Select } from 'antd';
import { GetColumns } from '../../components/workbench /versionManage';
import { APIListProduct } from '../../libs/API/productlist';
type Data = VersionResponse['data'][0];

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
`;
export default function versionManage() {
  const [versionData, setVersionData] = useState<VersionResponse>({
    code: 0,
    data: [],
  });
  const [prods, setProds] = useState<ProdResponse>({
    code: 0,
    data: [],
  });
  const GetVersionList = useCallback(() => {
    Axios.get<VersionResponse>(VersionAPI).then(res =>
      setVersionData(res.data)
    );
  }, []);
  const Actions: TActions<Data> = ({ record, form, method }) => {
    const { isEditing, edit, cancel } = method;
    return !isEditing(record) ? (
      <ButtonBox>
        <Button
          type={'primary'}
          icon={'edit'}
          onClick={() => {
            edit(record);
          }}
        >
          编辑
        </Button>
        <Popconfirm
          placement="topLeft"
          title={'确认删除?'}
          okText="Yes"
          cancelText="No"
        >
          <Button type={'danger'} icon={'delete'}>
            删除
          </Button>
        </Popconfirm>
      </ButtonBox>
    ) : (
      <ButtonBox>
        <Button
          type={'primary'}
          icon={'upload'}
          onClick={() => {
            form.validateFields((err, values) => {
              if (err) return;
              else {
                console.log(values);
              }
            });
          }}
        >
          提交
        </Button>
        <Button icon={'edit'} onClick={() => cancel()}>
          取消
        </Button>
      </ButtonBox>
    );
  };
  const Columns = useMemo(() => {
    console.log(prods);
    return GetColumns(
      <Select style={{ minWidth: '10em', width: '100%' }}>
        {prods.data.map(e => {
          console.log(111, e);
          return (
            <Select.Option key={e.productID} value={e.product}>
              {e.product}
            </Select.Option>
          );
        })}
      </Select>
    );
  }, [prods]);
  const ListProd = useCallback(() => {
    APIListProduct(
      res => {
        return setProds(res.data);
      },
      err => message.error('接口调用失败')
    );
  }, []);

  const EditableFormTable = useMemo(
    () =>
      Form.create<any>()(
        getEditableTable(Actions, Columns, {
          rowKey: e => e.versionID.toString(),
        })
      ),
    [Columns]
  );

  useEffect(() => ListProd(), []);
  useEffect(() => GetVersionList(), []);

  return (
    <MainLayout>
      <EditableFormTable data={versionData.data} />
    </MainLayout>
  );
}
