import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { Response as prodRep } from '../../libs/API/get_products';
import { Response as versionResp } from '../../libs/API/filter_testversions';
import { Response as videoResp } from '../../libs/API/get_video';
import { Request as listReq } from '../../libs/API/tasklist';
import styled from 'styled-components';

type model = Omit<listReq, 'count' | 'offset'>;
type Props = {
  products?: prodRep['data'];
  versions: versionResp;
  videos: videoResp;
  onFilterChange: (model: model) => void;
};

const StyledSelect = styled(Select)`
  min-width: 15rem;
  max-width: 45rem;
`;

export default function FilterPanel(props: Props) {
  const [model, setModel] = useState<model>({
    taskname: '',
    product: [],
    version: [],
    video: [],
  });

  useEffect(() => {
    props.onFilterChange(model);
  }, [model]);

  return (
    <div>
      <Form layout={'inline'}>
        <Form.Item label={'任务名'}>
          <Input
            onChange={e => setModel(v => ({ ...v, taskname: e.target.value }))}
          />
        </Form.Item>
        <Form.Item label={'产品'}>
          <StyledSelect
            mode={'multiple'}
            placeholder={'选择产品型号'}
            onChange={(e: string[]) => setModel(v => ({ ...v, product: e }))}
            style={{ width: '100%' }}
          >
            {props.products &&
              props.products.map(e => (
                <Select.Option value={e} key={e}>
                  {e}
                </Select.Option>
              ))}
          </StyledSelect>
        </Form.Item>
        <Form.Item label={'测试版本'}>
          <StyledSelect
            mode={'multiple'}
            placeholder={'选择测试版本'}
            onChange={(e: string[]) => setModel(v => ({ ...v, version: e }))}
            style={{ width: '100%' }}
          >
            {props.versions.data.map(e => (
              <Select.Option key={e} value={e}>
                {e}
              </Select.Option>
            ))}
          </StyledSelect>
        </Form.Item>
        <Form.Item label={'视频流'}>
          <StyledSelect
            mode={'multiple'}
            placeholder={'选择视频流'}
            onChange={(e: string[]) => setModel(v => ({ ...v, video: e }))}
            style={{ width: '100%' }}
          >
            {props.videos.data.map(e => (
              <Select.Option key={e} value={e}>
                {e}
              </Select.Option>
            ))}
          </StyledSelect>
        </Form.Item>
      </Form>
    </div>
  );
}
