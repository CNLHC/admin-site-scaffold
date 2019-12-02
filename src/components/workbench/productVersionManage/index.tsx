import React, { useEffect } from 'react';
import { Modal, Input, Select, Upload, Icon, DatePicker } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import { ModalProps } from 'antd/lib/modal';
import { Request } from '../../../libs/API/create_product';
import { RootState, useTypedSelector } from '../../../libs/store';
import { APIGetProducts } from '../../../libs/API/get_products';
import { useDispatch } from 'react-redux';
import { ACTGetProducts } from '../../../libs/state/basic';

interface TProps extends FormComponentProps {
  modal: ModalProps;
  onSubmit: (e: Request) => void;
}

function index({ onSubmit, modal, form }: TProps) {
  const { getFieldDecorator } = form;
  const products = useTypedSelector(e => e.BasicInfoReducer.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products)
      APIGetProducts().then(res => dispatch(ACTGetProducts(res.data.data)));
  }, []);

  const Version = (
    <Form.Item label="版本">
      {getFieldDecorator('versions', {
        rules: [{ required: true, message: '请输入版本' }],
      })(<Input />)}
    </Form.Item>
  );
  const VersionType = (
    <Form.Item label="类型">
      {getFieldDecorator('versionType', {
        rules: [{ required: true, message: '请选择类型' }],
      })(
        <Select>
          <Select.Option value={'固件'}>固件</Select.Option>
          <Select.Option value={'算法'}>算法</Select.Option>
          <Select.Option value={'全量包'}>全量包</Select.Option>
        </Select>
      )}
    </Form.Item>
  );
  const Product = (
    <Form.Item label="产品">
      {getFieldDecorator('product', {
        rules: [{ required: true, message: '请选择类型' }],
      })(
        <Select>
          {products &&
            products.map(e => <Select.Option value={e}>{e}</Select.Option>)}
        </Select>
      )}
    </Form.Item>
  );
  const ReleaseTime = (
    <Form.Item label="发布时间">
      {getFieldDecorator('releaseTime', {
        rules: [{ required: true, message: '请选择类型' }],
      })(<DatePicker />)}
    </Form.Item>
  );
  const ReleaseNote = (
    <Form.Item label="备注">
      {getFieldDecorator('releaseNote', {})(<Input.TextArea rows={4} />)}
    </Form.Item>
  );
  const ChangeLog = (
    <Form.Item label="备注">
      {getFieldDecorator('changeLog', {})(<Input.TextArea rows={4} />)}
    </Form.Item>
  );
  const File = (
    <Form.Item label={'上传升级包'}>
      {getFieldDecorator('firmwarefile', {
        valuePropName: 'fileList',
        getValueFromEvent: e => [e.file],
        rules: [{ required: true }],
      })(
        <Upload.Dragger name="files" >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">点击或拖动上传</p>
        </Upload.Dragger>
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
        {Version}
        {VersionType}
        {Product}
        {ReleaseTime}
        {ReleaseNote}
        {ChangeLog}
        {File}
      </Form>
    </Modal>
  );
}

const ModalFormCreateVersion = Form.create<TProps>({})(index);
export default ModalFormCreateVersion;
