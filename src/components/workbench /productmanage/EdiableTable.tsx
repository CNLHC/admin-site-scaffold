import { useState, useContext } from 'react';
import React from 'react';
import { Table, Button } from 'antd';
import useEditableCell from '../../Common/EditableCell';
import styled from 'styled-components';

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const EditableContext = React.createContext(undefined);

const getColumns = ({ Actions }) => [
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
    title: '操作',
    dataIndex: 'operation',
    render: (_, record) => <Actions data={record} />,
  },
];

const EditableTable = (props: any) => {
  const [editingKey, setEditingKey] = useState(undefined);
  const isEditing = record => record.productID === editingKey;
  const cancel = () => setEditingKey('');
  const edit = key => setEditingKey(key);
  const [Ctx, Cell] = useEditableCell();
  const components = { body: { cell: Cell } };

  const Actions = (props: any) => {
    const form = useContext(Ctx);
    return isEditing(props.data.productID) ? (
      <ButtonBox>
        <Button
          type={'primary'}
          icon={'edit'}
          onClick={() => edit(props.data.productID)}
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
          onClick={() => console.log(form)}
        >
          提交
        </Button>
        <Button icon={'edit'} onClick={() => edit(undefined)}>
          取消
        </Button>
      </ButtonBox>
    );
  };

  const columns = getColumns({
    Actions,
  }).map(col =>
    !col.editable
      ? col
      : {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        }
  ); 

  return (
    <Ctx.Provider value={props.form}>
      <Table
        rowKey={e => e.productID}
        components={components}
        bordered
        dataSource={props.data}
        columns={columns}
        pagination={{
          onChange: cancel,
        }}
      />
    </Ctx.Provider>
  );
};

export default EditableTable;
