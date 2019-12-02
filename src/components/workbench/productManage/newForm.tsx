import React from 'react';
import { Modal, Input, Select } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import { ModalProps } from 'antd/lib/modal';
import { Request } from '../../../libs/API/create_product';

interface TProps extends FormComponentProps {
  modal: ModalProps;
  onSubmit: (e: Request) => void;
}

function index({ onSubmit, modal, form }: TProps) {
  const { getFieldDecorator } = form;

  const Product = (
    <Form.Item label="产品">
      {getFieldDecorator('product', {
        rules: [{ required: true, message: '请填写产品' }],
      })(<Input />)}
    </Form.Item>
  );
  const Factory = (
    <Form.Item label="厂家">
      {getFieldDecorator('factory', {
        rules: [{ required: true, message: '请填写厂家' }],
      })(<Input />)}
    </Form.Item>
  );
  const ProductType = (
    <Form.Item label="产品类型">
      {getFieldDecorator('productType', {
        rules: [{ required: true, message: '请选择产品类型' }],
      })(
        <Select>
          <Select.Option value={'抓拍机'}>抓拍机</Select.Option>
          <Select.Option value={'识别机'}>识别机</Select.Option>
          <Select.Option value={'结构化'}>结构化</Select.Option>
        </Select>
      )}
    </Form.Item>
  );
  const handleSubmit = () => {
    form.validateFields((err, value) => {
      if (err) console.log(err);
      onSubmit(value);
    });
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  return (
    <Modal {...modal} onOk={handleSubmit}>
      <Form {...formItemLayout}>
        {Product}
        {Factory}
        {ProductType}
      </Form>
    </Modal>
  );
}

const ModalFormCreateProduct = Form.create<TProps>({})(index);
export default ModalFormCreateProduct;
