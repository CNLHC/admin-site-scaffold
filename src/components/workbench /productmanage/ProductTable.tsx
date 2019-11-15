import React, { createContext, useState, useEffect } from 'react';
import { Table, Input, Button, Select } from 'antd';
import { Response } from '../../../libs/API/productlist';
import { Request as UpdateReq } from '../../../libs/API/update_product';
import { ColumnProps, AdditionalCellProps } from 'antd/lib/table';
import styled from 'styled-components';
import Axios from 'axios';

const EditContext = createContext<{
  onGatherData: (fieldname, value) => void;
}>(undefined);

type Data = Response['data'][0];
const getColumns: (
  Actions: (props: { data: Data }) => JSX.Element,
  Editing: (id: number) => boolean
) => ColumnProps<Data>[] = (Actions, Editing) =>
  [
    {
      dataIndex: 'factory',
      title: '厂家',
      key: 'factory',
      editable: true,
      width: '25%',
      align: 'center' as 'center',
    },
    {
      dataIndex: 'product',
      title: '产品',
      key: 'product',
      editable: true,
      width: '25%',
      align: 'center' as 'center',
    },
    {
      dataIndex: 'productType',
      title: '产品类型',
      key: 'productType',
      editable: true,
      width: '25%',
      align: 'center' as 'center',
    },
    {
      dataIndex: 'Actions',
      title: '操作',
      key: 'Actions',
      render: (_t, record) => <Actions data={record} />,
      editable: false,
    },
  ].map(e =>
    e.editable
      ? {
          ...e,
          onCell: record => ({
            record,
            editing: Editing(record.productID),
            dataIndex: e.dataIndex,
            InputMethod: (props: {
              value: string;
              onChange: (e: string) => void;
            }) =>
              e.dataIndex === 'productType' ? (
                <Select
                  style={{ width: '100%' }}
                  defaultValue={props.value}
                  onChange={e => props.onChange(e)}
                >
                  <Select.Option value={'抓拍机'}>抓拍机</Select.Option>
                  <Select.Option value={'结构化'}>结构化</Select.Option>
                  <Select.Option value={'识别机'}>识别机</Select.Option>
                </Select>
              ) : (
                <Input
                  defaultValue={props.value}
                  onChange={e => props.onChange(e.target.value)}
                ></Input>
              ),
          }),
        }
      : e
  );

type TProps = {
  data: Response;
};
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default function ProductTable(props: TProps) {
  const [editing, setEditing] = useState<number | undefined>(undefined);
  const [model, setModel] = useState<Partial<Omit<UpdateReq, 'productID'>>>({});
  const [payload, setPayload] = useState<UpdateReq | undefined>(undefined);

  const Editing = (_id: number) => editing === _id;
  const Actions = (props: { data: Data }) =>
    !Editing(props.data.productID) ? (
      <ButtonBox>
        <Button
          type={'primary'}
          icon={'edit'}
          onClick={() => setEditing(props.data.productID)}
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
          onClick={() => setEditing(props.data.productID)}
        >
          提交
        </Button>
        <Button icon={'edit'} onClick={() => setEditing(undefined)}>
          取消
        </Button>
      </ButtonBox>
    );
  const columns = getColumns(Actions, Editing);
  const onGatherData = (field: string, value: string) =>
    console.log(field, value);
  return (
    <EditContext.Provider value={{ onGatherData }}>
      <Table
        // components={{
        //   body: {
        //     // cell: EditCell,
        //   },
        // }}
        columns={columns}
        dataSource={props.data.data}
      />
    </EditContext.Provider>
  );
}
