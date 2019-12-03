import React, { useMemo, useEffect, useState } from 'react';
import Table, { ColumnProps } from 'antd/lib/table';

import { Response } from '../../../libs/API/get_benchmark';
import { Form, Select, message } from 'antd';
import { useTypedSelector } from '../../../libs/store';
import { useDispatch } from 'react-redux';
import { APIGetProducts } from '../../../libs/API/get_products';
import { ACTGetProducts, ACTGetVideos } from '../../../libs/state/basic';
import { FormComponentProps } from 'antd/lib/form';
import {
  Response as TestVersionResp,
  APIFilterTestVersion,
} from '../../../libs/API/filter_testversions';
import { APIGetVideo } from '../../../libs/API/get_video';
import styled from 'styled-components';
type Data = Response['data']['items'][0];

export const GetColumns: () => ColumnProps<Data>[] = () => [
  {
    dataIndex: 'taskname',
    title: '任务名称',
    key: 'taskname',
    width: '15%',
    ellipsis: true,
  },
  { dataIndex: 'tasktime', title: '任务时间 ', key: 'tasktime' },
  { dataIndex: 'tasktype', title: '任务类型 ', key: 'tasktype' },
  { dataIndex: 'taskversion', title: '任务版本 ', key: 'taskversion' },
  { dataIndex: 'videoname', title: '视频名称 ', key: 'videoname' },
  { dataIndex: 'basenum', title: '标注底库 ', key: 'basenum' },
  { dataIndex: 'caprate', title: '抓排率 ', key: 'caprate' },
  { dataIndex: 'capturenum', title: '推图总数 ', key: 'capturenum' },
  { dataIndex: 'duenum', title: '重复数 ', key: 'duenum' },
  { dataIndex: 'duerate', title: '重复率 ', key: 'duerate' },
  { dataIndex: 'eftfacenum', title: '有效face数', key: 'eftnumace' },
  { dataIndex: 'fpnum', title: '误拍数 ', key: 'fpnum' },
  { dataIndex: 'fprate', title: '误拍率 ', key: 'fprate' },
  { dataIndex: 'missnum', title: '错误数 ', key: 'missnum' },
  { dataIndex: 'product', title: '产品 ', key: 'product' },
];

const StyledSelect = styled(Select)`
  min-width: 15rem;
  max-width: 45rem;
`;
interface TProps extends FormComponentProps {
  onChange: (v) => void;
}

export const Panel = ({ form }: TProps) => {
  const { getFieldDecorator, getFieldValue } = form;
  const products = useTypedSelector(e => e.BasicInfoReducer.products);
  const videos = useTypedSelector(e => e.BasicInfoReducer.videos);
  const [tv, setTV] = useState<TestVersionResp['data']>([]);
  const dispatch = useDispatch();
  const selectedProducts: string[] = getFieldValue('product');
  useEffect(() => {
    if (!products)
      APIGetProducts().then(res => dispatch(ACTGetProducts(res.data.data)));
    if (!videos)
      APIGetVideo().then(res => dispatch(ACTGetVideos(res.data.data)));
  }, []);

  useEffect(() => {
    if (selectedProducts && selectedProducts.length > 0)
      APIFilterTestVersion({ product: selectedProducts })
        .then(res => setTV(res.data.data))
        .catch(() => message.error('错误'));
  }, [selectedProducts]);

  const Product = (
    <Form.Item label="产品">
      {getFieldDecorator('product', { initialValue: [] })(
        <StyledSelect mode={'multiple'} placeholder={'选择产品型号'}>
          {products &&
            products.map(e => (
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
          {tv &&
            tv.map(e => (
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
          {videos &&
            videos.map(e => (
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
const TestVerisionFilterPanel = Form.create<TProps>({
  onValuesChange: (props, _, v) => {
    props.onChange(v);
  },
})(Panel);
export default TestVerisionFilterPanel;
