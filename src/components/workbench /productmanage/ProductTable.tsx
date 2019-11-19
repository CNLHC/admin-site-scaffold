import React from 'react';
import { Input, Form, Button, Select } from 'antd';
import { TActions } from '../../Common/EdiableTable';
import { Response } from '../../../libs/API/productlist';
import styled from 'styled-components';
import getEditableTable, {
  EditableTableColumnProps,
} from '../../Common/EdiableTable';
type Data = Response['data'][0];

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

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
      <Button type={'danger'} icon={'delete'}>
        删除
      </Button>
    </ButtonBox>
  ) : (
    <ButtonBox>
      <Button
        type={'primary'}
        icon={'upload'}
        onClick={() => {
          form.validateFields();
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

const EditableFormTable = Form.create<any>()(
  getEditableTable(Actions, Columns)
);

export default EditableFormTable;
