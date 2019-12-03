import Table, { ColumnProps } from 'antd/lib/table';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Response,
  Request,
  APIListResources,
} from '../../libs/API/list_resources';
import { message, Form, Button, Popconfirm, Input } from 'antd';
import MainLayout from '../../components/Layout';
import getEditableTable, {
  TActions,
  EditableTableColumnProps,
} from '../../components/Common/EdiableTable';
import styled from 'styled-components';
import { debounce } from 'debounce';
import QAResourceFilterPanel from '../../components/QAResource/panel';
import ModalFormQAResource from '../../components/QAResource/modalform';
import { NewButton } from '../../components/Common/Button';

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
`;
const HBox = styled.div`
  display: flex;
  justify-content: flex-start;
`;
type Data = Response['data'];
const Columns: EditableTableColumnProps<Data[0]>[] = [
  {
    dataIndex: 'name',
    title: '资源名称',
    key: 'name',
    editable: true,
    inputField: <Input />,
  },
  {
    dataIndex: 'fullpath',
    title: '文件名',
    key: 'fullpath',
    render: (text: string) => text.split('/').reverse()[0],
  },
  {
    dataIndex: 'note',
    title: '资源说明',
    key: 'note',
    editable: true,
    inputField: <Input.TextArea />,
  },
  { dataIndex: 'type', title: '资源类型', key: 'type' },
  { dataIndex: 'size', title: '资源大小', key: 'size' },
];

export default function index() {
  const [data, setData] = useState<Data>([]);
  const [payload, setPayload] = useState<Request>({
    type: '',
    name: '',
  });
  const UpdateList = useCallback(
    debounce<(payload: Request) => void>(
      payload => {
        APIListResources(payload)
          .then(res => setData(res.data.data))
          .catch(() => message.error('网络错误'));
      },
      50,
      true
    ),
    []
  );
  useEffect(() => {
    UpdateList(payload);
  }, [payload]);

  const Actions: TActions<Data[0]> = ({ record, form, method }) => {
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
        <Button type={'primary'} icon={'upload'} onClick={() => {}}>
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
          rowKey: e => e.id.toString(),
          pagination: false,
        })
      ),
    []
  );
  const [modal, setModal] = useState(false);
  return (
    <MainLayout>
      <ModalFormQAResource
        onSubmit={e => console.log(111, e)}
        modal={{
          title: '新建资源',
          visible: modal,
          onCancel: () => setModal(false),
        }}
      />

      <HBox>
        <NewButton
          onClick={() => setModal(true)}
          style={{ marginRight: '1.5rem' }}
        >
          添加资源
        </NewButton>
        <QAResourceFilterPanel
          onChange={v => setPayload(e => ({ ...e, ...v }))}
        />
      </HBox>
      <EditableFormTable data={data} />
    </MainLayout>
  );
}
