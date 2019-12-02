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
import { GetColumns } from '../../components/workbench/versionManage';
import { APIListProduct } from '../../libs/API/productlist';
import { withAuthCheck } from '../../libs/withCSRAuth';
import { NewButton } from '../../components/Common/Button';
import ModalFormCreateVersion from '../../components/workbench/productVersionManage';
import { withRedux } from '../../libs/withRedux';
import { Moment } from 'moment';
import { APICreateVersions } from '../../libs/API/create_versions';
import { UploadFile } from 'antd/lib/upload/interface';
type Data = VersionResponse['data'][0];

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
`;
function versionManage() {
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
    return GetColumns(
      <Select style={{ minWidth: '10em', width: '100%' }}>
        {prods.data.map(e => {
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

  const [modal, setModal] = useState(false);

  return (
    <MainLayout>
      <ModalFormCreateVersion
        onSubmit={e => {
          let fd = new FormData();
          Object.entries(e).forEach(([k, v]) => {
            if (k === 'releaseTime')
              fd.append(k, (v as Moment).format('YYYY-MM-DD'));
            else if (k === 'firmwarefile')
              fd.append(k, (v[0] as UploadFile).originFileObj);
            else fd.append(k, v);
          });
          APICreateVersions(fd)
            .then(() => {
              message.success('创建版本成功');
              setModal(false);
            })
            .catch(() => message.error('网络错误'));
        }}
        modal={{
          title: '发布版本',
          visible: modal,
          onCancel: () => setModal(false),
        }}
      />

      <NewButton size={'large'} type={'primary'} onClick={() => setModal(true)}>
        添加产品
      </NewButton>
      <EditableFormTable data={versionData.data} />
    </MainLayout>
  );
}

export default withAuthCheck(withRedux(versionManage));
