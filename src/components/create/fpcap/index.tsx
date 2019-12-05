import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, message, Radio, Upload, Icon } from 'antd';
import Form, { FormProps, FormComponentProps } from 'antd/lib/form';
import {
  Response as VideoResp,
  APIGetVideo,
} from '../../../libs/API/get_video';
import {
  Response as ProdResp,
  APIGetProducts,
} from '../../../libs/API/get_products';
import RadioGroup from 'antd/lib/radio/group';
import {
  Response as VersionResp,
  APIFilterTestVersion,
} from '../../../libs/API/filter_testversions';
import { ModalProps } from 'antd/lib/modal';
import {
  Response as TaskTypeResp,
  APITaskType,
} from '../../../libs/API/task_type';
import { Response as BaseResp, APIBaseList } from '../../../libs/API/baselist';
import { UploadFile } from 'antd/lib/upload/interface';

//
//taskname: 12
//tasktype: FP
//videoname: test_fp
//basename: test_fp
//taskversion: old_c3s_7030_CNN190220
//product: C3S
//uploadmethod: file
//ftpserver: tw
//ftppath:
//capfiles: (binary)
interface TOwnProps {
  modal: ModalProps;
}

interface TProps extends FormComponentProps {
  modal: ModalProps;
  tasktype: string[];
  onSubmit: (e: FormData) => void;
}

function index({
  onSubmit,
  modal,
  form,
  tasktype,
}: TOwnProps & TProps) {
  const { getFieldDecorator, getFieldValue, resetFields } = form;
  const [videos, setVideos] = useState<VideoResp['data']>([]);
  const [products, setProd] = useState<ProdResp['data']>([]);
  const [versions, setVersions] = useState<VersionResp['data']>([]);
  const [base, setBase] = useState<BaseResp['data']>([]);
  const selectedProd = getFieldValue('product');
  const selectedType = getFieldValue('tasktype');
  const selectedVideo = getFieldValue('videoname');

  useEffect(() => {
    APIGetVideo()
      .then(res => setVideos(res.data.data))
      .catch(() => message.error('网络错误'));
    APIGetProducts()
      .then(res => setProd(res.data.data))
      .catch(() => message.error('网络错误'));
  }, []);
  useEffect(() => {
    resetFields(['basename']);
    if (selectedVideo) {
      APIBaseList({ videoname: selectedVideo, basetype: '普通' })
        .then(res => setBase(res.data.data))
        .catch(() => message.error('网络错误'));
    }
  }, [selectedVideo]);
  useEffect(() => {
    resetFields(['taskversion']);
    APIFilterTestVersion({ product: [selectedProd] })
      .then(res => setVersions(res.data.data))
      .catch(() => message.error('网络错误'));
  }, [selectedProd]);
  useEffect(() => {
    resetFields(['videoname']);
    if (selectedType ) {
      APITaskType({ task_type: selectedType })
        .then(res => setVideos(res.data.data ? res.data.data : []))
        .catch(() => message.error('网络错误'));
    }
  }, [selectedType]);
  const normFile = e => {
    return [e.file];
  };
  const TaskName = (
    <Form.Item label="任务名称">
      {getFieldDecorator('taskname', {
        rules: [{ required: true, message: '请填写测试名称' }],
      })(<Input />)}
    </Form.Item>
  );
  const TestMethod = (
    <Form.Item label="测试方式">
      {getFieldDecorator('tasktype', {
        rules: [{ required: true, message: '请选择测试方式' }],
      })(
        <Select>
          {tasktype.map(e => (
            <Select.Option value={e} key={e}>
              {e}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
  const Base = (
    <Form.Item label="视频底库">
      {getFieldDecorator('basename', {
        rules: [{ required: true, message: '请选择视频底库' }],
      })(
        <Select>
          {base.map(e => (
            <Select.Option value={e.baseName} key={e.baseNum}>
              {e.baseName}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );

  const VideoName = (
    <Form.Item label="测试视频流">
      {getFieldDecorator('videoname', {
        rules: [{ required: true, message: '请选择测试视频流' }],
      })(
        <Select>
          {videos &&
            videos.map(e => (
              <Select.Option value={e} key={e}>
                {e}
              </Select.Option>
            ))}
        </Select>
      )}
    </Form.Item>
  );
  const Product = (
    <Form.Item label="测试产品">
      {getFieldDecorator('product', {
        rules: [{ required: true, message: '请选择测试产品' }],
      })(
        <Select>
          {products.map(e => (
            <Select.Option value={e} key={e}>
              {e}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
  const TaskVersion = (
    <Form.Item label="测试版本">
      {getFieldDecorator('taskversion', {
        rules: [{ required: true, message: '请选择测试版本' }],
      })(
        <Select>
          {versions.map(e => (
            <Select.Option value={e} key={e}>
              {e}
            </Select.Option>
          ))}
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
              <Radio.Button value="tw">台湾(10.169.1.236)</Radio.Button>
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
        {getFieldDecorator('capfiles', {
          valuePropName: 'fileList',
          getValueFromEvent: normFile,
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
          k === 'capfiles' ? (v[0] as UploadFile).originFileObj : (v as string)
        )
      );

      onSubmit(fd);
    });
  };
  return (
    <Modal {...modal} onOk={handleSubmit}>
      <Form {...formItemLayout}>
        {TaskName}
        {TestMethod}
        {VideoName}
        {Base}

        {Product}
        {TaskVersion}
        {UploadMethod}
        {DataSource}
      </Form>
    </Modal>
  );
}

const ModalFormFPCAP = Form.create<TProps>({})(index);
export default ModalFormFPCAP;
