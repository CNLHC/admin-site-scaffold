import React from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

interface TProps extends FormComponentProps {
  onChange: (v) => void;
}
function panel({ form }: TProps) {
  const { getFieldDecorator } = form;

  const name = (
    <Form.Item label={'名称'}>
      {getFieldDecorator('name', {})(<Input />)}
    </Form.Item>
  );
  return <Form layout={'inline'}>{name}</Form>;
}

const QAResourceFilterPanel = Form.create<TProps>({
  onValuesChange(props, v) {
    props.onChange(v);
  },
})(panel);

export default QAResourceFilterPanel;
