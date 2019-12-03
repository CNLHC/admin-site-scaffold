import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, DatePicker, message } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import { ModalProps } from 'antd/lib/modal';
import { useTypedSelector } from '../../../libs/store';
import { APIGetProducts } from '../../../libs/API/get_products';
import { useDispatch } from 'react-redux';
import { ACTGetProducts } from '../../../libs/state/basic';
import {
  Response,
  APIFilterVersionPart,
} from '../../../libs/API/filter_version_as_part';

interface TProps extends FormComponentProps {
  modal: ModalProps;
  onSubmit: (e) => void;
}

function index({ onSubmit, modal, form }: TProps) {
  const { getFieldDecorator, getFieldValue } = form;
  const products = useTypedSelector(e => e.BasicInfoReducer.products);
  const dispatch = useDispatch();
  const [resource, setResource] = useState<Response['data']>({
    algorithm: [],
    firmware: [],
    fullpack: [],
  });
  const selectedProduct: string = getFieldValue('product');
  useEffect(() => {
    selectedProduct &&
      APIFilterVersionPart({ product: selectedProduct })
        .then(res => setResource(res.data.data))
        .catch(() => message.error('网络错误'));
  }, [selectedProduct]);

  if (!products)
    APIGetProducts().then(res => dispatch(ACTGetProducts(res.data.data)));

  const TestVersion = (
    <Form.Item label="版本">
      {getFieldDecorator('testVersionName', {
        rules: [{ required: true, message: '请填写测试版本' }],
      })(<Input />)}
    </Form.Item>
  );
  const Product = (
    <Form.Item label="产品">
      {getFieldDecorator('product', {
        rules: [{ required: true, message: '请选择类型' }],
      })(
        <Select>
          {products &&
            products.map(e => (
              <Select.Option value={e} key={e}>
                {e}
              </Select.Option>
            ))}
        </Select>
      )}
    </Form.Item>
  );
  const ReleaseTime = (
    <Form.Item label="发布时间">
      {getFieldDecorator('createTime', {
        rules: [{ required: true, message: '请选择类型' }],
      })(<DatePicker />)}
    </Form.Item>
  );
  const AlgorithmVersion = (
    <Form.Item label="算法">
      {getFieldDecorator('algorithmVersionName', { initialValue: ' ' })(
        <Select>
          {resource.algorithm.map(e => (
            <Select.Option value={e} key={e}>
              {e}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
  const FirmwareVersion = (
    <Form.Item label="固件包">
      {getFieldDecorator('firmwareVersionName', { initialValue: ' ' })(
        <Select>
          {resource.firmware.map(e => (
            <Select.Option value={e} key={e}>
              {e}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
  const FullpackVersion = (
    <Form.Item label="全量包">
      {getFieldDecorator('fullPackVersionName', { initialValue: ' ' })(
        <Select>
          {resource.fullpack.map(e => (
            <Select.Option value={e} key={e}>
              {e}
            </Select.Option>
          ))}
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
        {TestVersion}
        {Product}
        {ReleaseTime}
        {AlgorithmVersion}
        {FirmwareVersion}
        {FullpackVersion}
      </Form>
    </Modal>
  );
}

const ModalFormCreateTestVersion = Form.create<TProps>({})(index);
export default ModalFormCreateTestVersion;
