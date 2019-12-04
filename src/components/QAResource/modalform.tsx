import React from 'react';
import { Modal, Input, Select, Radio, Upload, Icon } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import { ModalProps } from 'antd/lib/modal';
import RadioGroup from 'antd/lib/radio/group';
import { UploadFile } from 'antd/lib/upload/interface';

interface TOwnProps {
  modal: ModalProps;
}

interface TProps extends FormComponentProps {
  modal: ModalProps;

  onSubmit: (e: FormData) => void;
}

function index({ onSubmit, modal, form }: TOwnProps & TProps) {
  const { getFieldDecorator, getFieldValue } = form;

  const Name = (
    <Form.Item label="资源名称">
      {getFieldDecorator('name', {
        rules: [{ required: true, message: '请填写资源名称' }],
      })(<Input />)}
    </Form.Item>
  );
  const Note = (
    <Form.Item label="资源说明">
      {getFieldDecorator('note', {
        rules: [{ required: true, message: '请填写资源说明' }],
      })(<Input.TextArea rows={4} />)}
    </Form.Item>
  );
  const Type = (
    <Form.Item label="视频底库">
      {getFieldDecorator('type', {
        rules: [{ required: true, message: '请选择视频底库' }],
      })(
        <Select>
          <Select.Option value={'底库'} key={'Base'}>
            底库
          </Select.Option>
        </Select>
      )}
    </Form.Item>
  );

  const UploadMethod = (
    <Form.Item label="上传方式">
      {getFieldDecorator('uploadmethod', {
        initialValue: 'ftp',
      })(
        <RadioGroup>
          <Radio.Button value="ftp">ftp</Radio.Button>
          <Radio.Button value="file">文件</Radio.Button>
        </RadioGroup>
      )}
    </Form.Item>
  );

  const DataSource =
    getFieldValue('uploadmethod') === 'ftp' ? (
      <>
        <Form.Item label={'路径'}>
          {getFieldDecorator('ftpserver', {
            rules: [{ required: true }],
            initialValue: 'hk',
          })(
            <RadioGroup>
              <Radio.Button value="hk">香港(10.169.1.234)</Radio.Button>
              <Radio.Button value="tw">台湾(10.169.1.234)</Radio.Button>
            </RadioGroup>
          )}
        </Form.Item>
        <Form.Item label={'FTP路径'}>
          {getFieldDecorator('ftppath', {
            rules: [{ required: true, message: '请填写上传路径' }],
          })(<Input />)}
        </Form.Item>
      </>
    ) : (
      <Form.Item label={'文件上传'}>
        {getFieldDecorator('file', {
          valuePropName: 'fileList',
          getValueFromEvent: e => [e.file],
          rules: [{ required: true }],
        })(
          <Upload.Dragger name="files" accept={'.zip'}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或拖动上传</p>
          </Upload.Dragger>
        )}
      </Form.Item>
    );

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const handleSubmit = () => {
    form.validateFields((err, value) => {
      if (err) console.log(err);
      let fd = new FormData();
      Object.entries(value).forEach(([k, v]) =>
        fd.append(
          k,
          k === 'file' ? (v[0] as UploadFile).originFileObj : (v as string)
        )
      );

      onSubmit(fd);
    });
  };
  return (
    <Modal {...modal} onOk={handleSubmit}>
      <Form {...formItemLayout}>
        {Name}
        {Note}
        {Type}
        {UploadMethod}
        {DataSource}
      </Form>
    </Modal>
  );
}

const ModalFormQAResource = Form.create<TProps>({})(index);
export default ModalFormQAResource;
