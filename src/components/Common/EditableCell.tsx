import React from 'react';
import {useForm} from 'byte-form'

type TCellProps<T> = {
  children: JSX.Element[];
  className: string;
  editing: boolean;
  dataIndex: string;
  InputMethod: (props: {
    value: string;
    onChange: (v: string) => void;
  }) => JSX.Element;
  onClick: (e: any) => void;
  record: T;
};

const useEditableCell: <Record extends {}>() => [
  React.Context<any>,
  (props: TCellProps<Record>) => JSX.Element
] = () => {
  const EditCtx = React.createContext(undefined);

  const EditCell: <T extends {}>(props: TCellProps<T>) => JSX.Element = ({
    record,
    editing,
    children,
    dataIndex,
    InputMethod,
    ...rest
  }) => {
    return !editing ? (
      <td {...rest}>{children}</td>
    ) : (
      <EditCtx.Consumer>
        {({ onGatherData }) => (
          <td>
            <InputMethod
              value={record[dataIndex]}
              onChange={e => onGatherData(dataIndex, e)}
            />
          </td>
        )}
      </EditCtx.Consumer>
    );
  };
  return [EditCtx, EditCell];
};

export default useEditableCell;
