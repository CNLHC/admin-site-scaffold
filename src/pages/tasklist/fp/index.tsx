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

type data = Response['data'];

const ImageRow = styled(Row)`
  width: 100%;
  margin: 2rem 0;
  padding: 2rem 0;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;
const ImageCol = styled(Col)`
  height: 15rem;
  width: 15rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
  cursor: pointer;
  img {
    height: 100%;
    width: auto;
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    transform: scale(1.1);
  }
`;
const BigIcon = styled(Icon)`
  margin: 0.5rem;
  font-size: 2rem;
`;
interface TImage {
  data: data[0];
  checked: boolean;
  onCheck: (e: boolean) => void;
}

const Image = ({ data, checked, onCheck }: TImage) => (
  <ImageCol span={4} onClick={() => onCheck(checked)}>
    <img src={`${StaticRoot}${data.capimg}`} />
    {/* <icon={'check-cicle'} color={'green'} shape={'circle'}></Button> */}
    <BigIcon
      type="check-circle"
      style={{ color: checked ? '#73d13d' : '#e8e8e8' }}
    />
  </ImageCol>
);
const VBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SubmitButton = styled(Button)`
  margin: 2.5rem 1rem;
  width: 50%;
  height: 2.5rem;
`;
const ImageArea = styled.div`
  width: 100%;
`;

export default function index() {
  const router = useRouter();
  const [data, setData] = useState<data>([]);
  const [checked, setSelected] = useState<{ [key: string]: data[0] }>({});
  const getId = () => {
    const idstr: string | string[] | undefined = router.query.id;
    const id: number | undefined =
      idstr && typeof idstr === 'string' && parseInt(idstr);
    return id;
  };
  useEffect(() => {
    const id = getId();
    if (id) {
      APIGetAllCapture(id).then(res => setData(res.data.data));
    }
  }, [router]);
  console.log(checked);
  return (
    <MainLayout>
      <VBox>
        <ImageArea>
          {_.chunk(data, 5).map(e => (
            <ImageRow>
              {e.map(v => (
                <Image
                  key={v.capimg}
                  data={v}
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
                const id = getId();
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
