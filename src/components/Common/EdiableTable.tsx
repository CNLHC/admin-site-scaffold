import { useState } from 'react';
import React from 'react';
import { Table } from 'antd';
import useEditableCell, { TCellProps } from './EditableCell';
import { ColumnProps } from 'antd/lib/table';
import { FormComponentProps } from 'antd/lib/form';
import { WrappedFormUtils, GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { TableProps as AntTableProps } from 'antd/lib/table';

interface TActionProps<T> {
  record: T;
  form: WrappedFormUtils<T>;
  method: {
    isEditing: (data: T) => boolean;
    edit: (data: T) => void;
    cancel: (data?: T) => void;
  };
}
type TCurriedTableActions<T> = (props: { record: T }) => JSX.Element;

export type TActions<T> = (props: TActionProps<T>) => JSX.Element;

interface TableProps<T> extends FormComponentProps<T> {
  data: T[];
}
export interface EditableTableColumnProps<T> extends ColumnProps<T> {
  editable?: boolean;
  onCell?: (record: T) => Omit<TCellProps<T>, 'children'>;
  inputField: JSX.Element;
  getFieldConf?: (record: T, dataIndex: string) => GetFieldDecoratorOptions;
}

export const EditableContext = React.createContext(undefined);

const getColumns: <T>(props: {
  Columns: EditableTableColumnProps<T>[];
  Actions: TCurriedTableActions<T>;
  isEditing: (key: T) => boolean;
}) => EditableTableColumnProps<T>[] = ({ Actions, isEditing, Columns }) =>
  ([
    ...Columns,
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => <Actions record={record} />,
    },
  ] as EditableTableColumnProps<any>[]).map(col =>
    !col.editable
      ? col
      : {
        ...col,
          onCell: record => ({
            record,
            dataIndex: col.dataIndex,
            getFieldConf: col.getFieldConf,
            editing: isEditing(record),
            index: 0,
            getInput: () => col.inputField,
          }),
        }
  );

type TEditableTable<T> = (props: TableProps<T>) => JSX.Element;

const getEditableTable: <T>(
  Actions: TActions<T>,
  Columns: EditableTableColumnProps<T>[],
  TableProps: Omit<AntTableProps<T>, 'component' | 'columns' | 'dataSource'>
) => TEditableTable<T> = (Actions, Columns, TableProps) => {
  return ({ data, form }) => {
    const [editingKey, setEditingKey] = useState(undefined);
    const getKey = r => r.productID;
    const isEditing = record => getKey(record) === editingKey;
    const cancel = () => setEditingKey(undefined);
    const edit = record => setEditingKey(getKey(record));
    const [Ctx, Cell] = useEditableCell({});
    const components = { body: { cell: Cell } };

    const InnerActions: TCurriedTableActions<typeof data[0]> = ({ record }) => (
      <Actions
        record={record}
        form={form}
        method={{
          edit,
          isEditing,
          cancel,
        }}
      />
    );

    const columns = getColumns({
      Columns,
      Actions: InnerActions,
      isEditing,
    });

    return (
      <Ctx.Provider value={form}>
        <Table
          components={components}
          columns={columns}
          dataSource={data}
          {...TableProps}
        />
      </Ctx.Provider>
    );
  };
};
export default getEditableTable;
