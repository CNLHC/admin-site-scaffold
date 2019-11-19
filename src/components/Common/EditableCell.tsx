import React, { useMemo, useContext } from 'react';
import { Form } from 'antd';
import { WrappedFormUtils, GetFieldDecoratorOptions } from 'antd/lib/form/Form';
export type TCellProps<T> = {
  record;
  dataIndex: string;
  editing: boolean;
  index: number;
  getInput: () => JSX.Element;
  children: (props: any) => JSX.Element;
  getFieldConf?: (record: T, dataIndex: string) => GetFieldDecoratorOptions;
};

const useEditableCell: <T>(
  data: T
) => [
  React.Context<WrappedFormUtils<T>>,
  (props: TCellProps<T>) => JSX.Element
] = data => {
  const Ctx = useMemo(
    () => React.createContext<WrappedFormUtils<typeof data>>(undefined),
    []
  );
  const EditableCell = useMemo(
    () => (props: TCellProps<typeof data>) => {
      const { getFieldDecorator } = useContext(Ctx);

      const {
        editing,
        dataIndex,
        record,
        index,
        children,
        getInput,
        getFieldConf,
        ...restProps
      } = props;

      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item style={{ margin: 0 }}>
              {getFieldDecorator(
                dataIndex,
                getFieldConf ? getFieldConf(record, dataIndex) : {}
              )(getInput())}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    },
    []
  );

  return [Ctx, EditableCell];
};

export default useEditableCell;
