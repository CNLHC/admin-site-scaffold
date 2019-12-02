import React, { useState, useEffect, useMemo, useCallback } from 'react';
import MainLayout from '../../components/Layout';
import { Response, Route as ProdAPI } from '../../libs/API/productlist';
import Axios from 'axios';
import {
  Route as UpdateURL,
  Response as UpdateResponse,
  Request as UpdateRequest,
} from '../../libs/API/update_product';
import { Route as DeleteURL } from '../../libs/API/delete_product';
import getEditableTable, {
  TActions,
  EditableTableColumnProps,
} from '../../components/Common/EdiableTable';
import styled from 'styled-components';
import { Button, Form, Input, Select, message, Popconfirm } from 'antd';
import { withAuthCheck } from '../../libs/withCSRAuth';
import ModalFormCreateProduct from '../../components/workbench/productManage/newForm';
import { Request } from '../../libs/API/commit';
import { APICreateProduct } from '../../libs/API/create_product';
import { NewButton } from '../../components/Common/Button';
type Data = Response['data'][0];
const Columns: EditableTableColumnProps<Data>[] = [
  {
    dataIndex: 'factory',
    title: '厂家',
    key: 'factory',
    editable: true,
    width: '25%',
    align: 'center' as 'center',
    inputField: (
      <Input size="small" style={{ maxWidth: '50%', textAlign: 'center' }} />
    ),
    getFieldConf: (record, dataIndex) => ({
      initialValue: record[dataIndex],
      rules: [{ required: true, message: '请输入厂家' }],
    }),
  },
  {
    dataIndex: 'product',
    title: '产品',
    key: 'product',
    editable: true,
    width: '25%',
    align: 'center' as 'center',
    inputField: (
      <Input size="small" style={{ maxWidth: '50%', textAlign: 'center' }} />
    ),
    getFieldConf: (record, dataIndex) => ({
      initialValue: record[dataIndex],
      rules: [{ required: true, message: '请输入产品' }],
    }),
  },
  {
    dataIndex: 'productType',
    title: '产品类型',
    key: 'productType',
    editable: true,
    width: '25%',
    align: 'center' as 'center',
    inputField: (
      <Select>
        <Select.Option value={'抓拍机'}>抓拍机</Select.Option>
        <Select.Option value={'结构化'}>结构化</Select.Option>
        <Select.Option value={'识别机'}>识别机</Select.Option>
      </Select>
    ),
    getFieldConf: (record, dataIndex) => ({
      initialValue: record[dataIndex],
    }),
  },
];
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
`;
function productManage() {
  const [prodData, setProdData] = useState<Response>({
    code: 0,
    data: [],
  });
  const GetProductList = useCallback(() => {
    Axios.get<Response>(ProdAPI).then(res => setProdData(res.data));
  }, []);
  const DeleteProduct = useCallback((redo: Data) => {
    Axios.get(DeleteURL(redo.productID))
      .then(res => {
        message.success('删除成功');
        GetProductList();
      })
      .catch(() => message.error('删除失败'));
  }, []);

  const Actions: TActions<Data> = ({ record, form, method }) => {
    const { isEditing, edit, cancel } = method;
    return !isEditing(record) ? (
      <ButtonBox>
        <Button
          type={'primary'}
          icon={'edit'}
          onClick={() => {
            console.log(record);
            edit(record);
          }}
        >
          编辑
        </Button>
        <Popconfirm
          placement="topLeft"
          title={'确认删除?'}
          onConfirm={() => DeleteProduct(record)}
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
                Axios.post<UpdateResponse>(UpdateURL, { ...record, ...values })
                  .then(() => {
                    message.success('更新成功');
                    GetProductList();
                    cancel();
                  })
                  .catch(() => message.error('更新失败'));
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
  const EditableFormTable = useMemo(
    () =>
      Form.create<any>()(
        getEditableTable(Actions, Columns, {
          rowKey: e => e.productID.toString(),
          pagination: false,
        })
      ),
    []
  );

  useEffect(() => GetProductList(), []);

  const [modal, setModal] = useState(false);

  return (
    <MainLayout>
      <ModalFormCreateProduct
        modal={{
          title: '新建产品',
          onCancel: () => setModal(false),
          visible: modal,
        }}
        onSubmit={e =>
          APICreateProduct(e)
            .then(() => {
              message.success('创建成功');
              setModal(false);
              GetProductList();
            })
            .catch(() => message.error('网络错误'))
        }
      />
      <NewButton size={'large'} type={'primary'} onClick={() => setModal(true)}>
        添加产品
      </NewButton>
      <EditableFormTable data={prodData.data} />
    </MainLayout>
  );
}
export default withAuthCheck(productManage);
