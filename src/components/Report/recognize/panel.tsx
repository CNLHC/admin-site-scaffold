import React, { useEffect, useState } from 'react';
import { Form, Select, message } from 'antd';
import { useTypedSelector } from '../../../libs/store';
import { useDispatch } from 'react-redux';
import { ACTGetProducts, ACTGetVideos } from '../../../libs/state/basic';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  min-width: 15rem;
  max-width: 45rem;
`;
interface TProps extends FormComponentProps {
  onChange: (v) => void;
  product: string[];
  video: string[];
  //   base: string[];
  version: string[];
}

export const Panel = ({ product, video, version, form }: TProps) => {
  const { getFieldDecorator, getFieldValue } = form;

  const Product = (
    <Form.Item label="产品">
      {getFieldDecorator('product', { initialValue: [] })(
        <StyledSelect mode={'multiple'} placeholder={'选择产品型号'}>
          {product.map(e => (
            <Select.Option value={e} key={e}>
              {e}
            </Select.Option>
          ))}
        </StyledSelect>
      )}
    </Form.Item>
  );

  const TestVersion = (
    <Form.Item label="测试版本">
      {getFieldDecorator('version', { initialValue: [] })(
        <StyledSelect mode={'multiple'}>
          {version.map(e => (
            <Select.Option value={e} key={e}>
              {e}
            </Select.Option>
          ))}
        </StyledSelect>
      )}
    </Form.Item>
  );
  const VideoName = (
    <Form.Item label="视频">
      {getFieldDecorator('video', { initialValue: [] })(
        <StyledSelect mode={'multiple'}>
          {video.map(e => (
            <Select.Option value={e} key={e}>
              {e}
            </Select.Option>
          ))}
        </StyledSelect>
      )}
    </Form.Item>
  );
  return (
    <Form layout={'inline'}>
      {Product}
      {TestVersion}
      {VideoName}
    </Form>
  );
};
const FPFilterPanel = Form.create<TProps>({
  onValuesChange: (props, _, v) => {
    props.onChange(v);
  },
})(Panel);
export default FPFilterPanel;
