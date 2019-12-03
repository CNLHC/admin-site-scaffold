import React from 'react';
import { Modal, Input, Select, Upload, Icon } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import { ModalProps } from 'antd/lib/modal';
import { Request } from '../../../libs/API/create_product';

interface TProps extends FormComponentProps {
  modal: ModalProps;
  onSubmit: (e: Request) => void;
}

function index({ onSubmit, modal, form }: TProps) {
  const { getFieldDecorator } = form;

  const VideoName = (
    <Form.Item label="视频名称">
      {getFieldDecorator('videoname', {
        rules: [{ required: true }],
      })(<Input />)}
    </Form.Item>
  );
  const VideoType = (
    <Form.Item label="类型">
      {getFieldDecorator('videotype', {
        rules: [{ required: true }],
      })(
        <Select>
          <Select.Option value={'抓拍'}>抓拍</Select.Option>
          <Select.Option value={'fp'}>fp</Select.Option>
        </Select>
      )}
    </Form.Item>
  );
  const VideoThreshold = (
    <Form.Item label="阈值">
      {getFieldDecorator('videothreshold', {
        rules: [{ required: true }],
      })(<Input />)}
    </Form.Item>
  );
  const PeekDensity = (
    <Form.Item label="峰值人流密度">
      {getFieldDecorator('peakpedestriandensity', {
        rules: [{ required: true }],
      })(<Input />)}
    </Form.Item>
  );
  const SingleFrameCon = (
    <Form.Item label="单帧并发">
      {getFieldDecorator('singleframeconcurrency', {
        rules: [{ required: true }],
      })(<Input />)}
    </Form.Item>
  );
  const Scene = (
    <Form.Item label="场景">
      {getFieldDecorator('scene', {
        rules: [{ required: true }],
      })(<Input />)}
    </Form.Item>
  );
  const MaxPeople = (
    <Form.Item label="最大通过人数">
      {getFieldDecorator('maxpeople', {
        rules: [{ required: true }],
      })(<Input />)}
    </Form.Item>
  );
  const SinglePeopleTime = (
    <Form.Item label="单人通行时间">
      {getFieldDecorator('singlepasstime', {
        rules: [{ required: true }],
      })(<Input />)}
    </Form.Item>
  );
  const File = (
    <Form.Item label={'视频上传'}>
      {getFieldDecorator('file', {
        valuePropName: 'fileList',
        getValueFromEvent: e => [e.file],
        rules: [{ required: true }],
      })(
        <Upload.Dragger name="files">
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
        {VideoName}
        {VideoType}
        {VideoThreshold}
        {PeekDensity}
        {SingleFrameCon}
        {Scene}
        {MaxPeople}
        {SinglePeopleTime}
        {File}
      </Form>
    </Modal>
  );
}

const ModalFormCreateVideo = Form.create<TProps>({})(index);
export default ModalFormCreateVideo;
