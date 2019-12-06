import React from 'react';
import Form, { FormProps, FormComponentProps } from 'antd/lib/form';
import { Slider, Radio, InputNumber } from 'antd';
import { TState } from '../../libs/state/grid';

interface TProps extends FormComponentProps {
  settings: TState;
  onChange: (e: TState) => void;
}

function form({ form }: TProps) {
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <div>
      <Form {...formItemLayout}>
        <Form.Item label="行大小" help={'每行显示的卡片数量'}>
          {getFieldDecorator('rowSize', {})(<Slider min={1} max={10} />)}
        </Form.Item>
        <Form.Item label="行高" help={'卡片的高度'}>
          {getFieldDecorator(
            'rowHeight',
            {}
          )(<Slider min={5} max={25} step={0.5} />)}
        </Form.Item>
        {/* <Form.Item label="填充方式" help={'卡片对齐到网格方式'}>
          {getFieldDecorator(
            'fillMode',
            {}
          )(
            <Radio.Group>
              <Radio value={'width'}>适应宽度</Radio>
              <Radio value={'height'}>适应高度</Radio>
              <Radio value={'free'}>拉伸</Radio>
            </Radio.Group>
          )}
        </Form.Item> */}
        <Form.Item label="对齐" help={'卡片对齐到网格方式'}>
          {getFieldDecorator(
            'align',
            {}
          )(
            <Radio.Group>
              <Radio value={'left'}>左对齐</Radio>
              <Radio value={'right'}>右对齐</Radio>
              <Radio value={'center'}>居中</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="缩放系数" help={'鼠标悬浮时图片的放大倍数'}>
          {getFieldDecorator(
            'zoomCoef',
            {}
          )(<InputNumber step={0.1} max={3} />)}
        </Form.Item>
      </Form>
    </div>
  );
}

const ModalFormGridSetting = Form.create<TProps>({
  onValuesChange: ({ onChange }, values) => onChange(values),
  mapPropsToFields: ({ settings }) =>
    Object.entries(settings)
      .map(([key, value]) => ({ key, value }))
      .reduce(
        (a, { key, value }) => ({
          ...a,
          [key]: Form.createFormField({
            value,
          }),
        }),
        {}
      ),
})(form);
export default ModalFormGridSetting;
