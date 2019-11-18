import React, { useMemo, useContext, useState, forwardRef } from 'react';
import { Request as UpdateReq } from '../../libs/API/update_product';
import { Form, InputNumber, Input } from 'antd';
import { EditableContext } from '../workbench /productmanage/EdiableTable';
type TInputMethod = (props: {
  value?: string;
  onChange?: (v: string) => void;
}) => JSX.Element;

type TCellProps<T = {}> = {
  children: JSX.Element[];
  className: string;
  editing: boolean;
  dataIndex: string;
  InputMethod: TInputMethod;
  onClick: (e: any) => void;
  record: T;
};

const useEditableCell: () => [
  React.Context<any>,
  (props: any) => JSX.Element
] = () => {
  const Ctx = useMemo(() => React.createContext(undefined), []);
  const EditableCell = useMemo(
    () => props => {
      const getInput = () => {
        if (props.inputType === 'number') {
          return <InputNumber />;
        }
        return <Input />;
      };
      const { getFieldDecorator } = useContext(Ctx);

      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      } = props;

      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item style={{ margin: 0 }}>
              {getFieldDecorator(dataIndex)(getInput())}
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
