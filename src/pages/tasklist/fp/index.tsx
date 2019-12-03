import React, { useState, useEffect } from 'react';
import {
  Response,
  APIGetAllCapture,
} from '../../../libs/API/filter_allcapture';
import { useRouter } from 'next/router';
import { StaticRoot } from '../../../libs/constant/conf';
import MainLayout from '../../../components/Layout';
import _ from 'lodash';
import { Row, Col, Checkbox, Button, Icon, Modal, message } from 'antd';
import styled from 'styled-components';
import { APICommitFP } from '../../../libs/API/commit_fp';
import { number } from 'prop-types';
import {
  getId,
  ImageArea,
  VBox,
  SubmitButton,
  ImageCol,
  ImageRow,
  CheckAbleImage,
} from '../../../components/tasklist/Common';
import { ColProps } from 'antd/lib/col';

type data = Response['data'];

const BigIcon = styled(Icon)`
  margin: 0.5rem;
  font-size: 2rem;
`;
interface TImage {
  data: data[0];
  checked: boolean;
  onCheck: (e: boolean) => void;
  ColProps?: ColProps;
}

// const Image = ({ data, checked, onCheck,ColProps}: TImage) => (
//   <ImageCol {...ColProps} onClick={() => onCheck(checked)}>
//     <img src={`${StaticRoot}${data.capimg}`} />
//     <BigIcon
//       type="check-circle"
//       style={{ color: checked ? '#73d13d' : '#e8e8e8' }}
//     />
//   </ImageCol>
// );

export default function index() {
  const router = useRouter();
  const [data, setData] = useState<data>([]);
  const [checked, setSelected] = useState<{ [key: string]: data[0] }>({});
  useEffect(() => {
    const id = getId(router);
    if (id) {
      APIGetAllCapture(id).then(res => setData(res.data.data));
    }
  }, [router]);
  return (
    <MainLayout>
      <VBox>
        <ImageArea>
          {_.chunk(data, 5).map(e => (
            <ImageRow style={{ height: '12rem' }}>
              {e.map(v => (
                <CheckAbleImage
                  key={v.capimg}
                  imageUrl={v.capimg}
                  checked={checked[v.capimg] !== undefined}
                  onCheck={m => {
                    setSelected(d => ({
                      ...d,
                      [v.capimg]: m ? undefined : v,
                    }));
                  }}
                />
              ))}
            </ImageRow>
          ))}
        </ImageArea>

        <SubmitButton
          type={'primary'}
          onClick={() =>
            Modal.confirm({
              title: '确认提交?',
              content: `共标记 ${Object.entries(checked).length}/${
                data.length
              } 张图片`,

              onOk() {
                const id = getId(router);
                const payload = Object.entries(checked).map(([_k, v]) => v);
                if (id) {
                  APICommitFP({ FP: payload }, id).then(() => {
                    message.success('提交成功');
                    router.back();
                  });
                }
              },
            })
          }
        >
          确认提交
        </SubmitButton>
      </VBox>
    </MainLayout>
  );
}
