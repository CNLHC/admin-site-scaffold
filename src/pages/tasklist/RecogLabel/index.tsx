import React, { useState, useEffect } from 'react';
import MainLayout from '../../../components/Layout';
import { Response, APIGetRecog, Label } from '../../../libs/API/get_recog';
import _ from 'lodash';
import {
  VBox,
  ImageArea,
  SubmitButton,
  getId,
  ImageRow,
} from '../../../components/tasklist/Common';
import { useRouter } from 'next/router';
import { message, Radio, Modal } from 'antd';
import styled from 'styled-components';
import RadioGroup from 'antd/lib/radio/group';
import { StaticRoot } from '../../../libs/constant/conf';
import { APICommitRecog } from '../../../libs/API/commit_recog';

type data = Response['data']['items'];
interface TImageBox {
  data: data[0];
  onLabel: (l: Label) => void;
}
const RecogBoxRoot = styled.div`
  display: flex;
  justify-content: space-around;
  height: 8rem;
  transition: 0.1s ease-in-out;
  border-radius: 0.3rem;
  &:hover {
    img {
      transform: scale(1.2);
    }
  }
`;

const DiffBox = styled.div`
  padding: 0.5rem;
  width: 16rem;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  height: 100%;
  img {
    width: auto;
  }
`;
const DiffImgWrapper = styled.div`
  height: 100%;
  img {
    height: 100%;
    width: auto;
  }
`;
const RadioG = styled(RadioGroup)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const RecogCard = ({ data, onLabel }: TImageBox) => {
  return (
    <RecogBoxRoot
      style={{ background: data.dup && data.dup > 1 ? '#ffe7ba' : null }}
    >
      <DiffBox
        onClick={() =>
          onLabel(data.label === 'wrong' ? Label.Right : Label.Wrong)
        }
      >
        <DiffImgWrapper>
          <img src={`${StaticRoot}${data.base}`} />
        </DiffImgWrapper>
        <DiffImgWrapper>
          <img src={`${StaticRoot}${data.cap}`} />
        </DiffImgWrapper>
      </DiffBox>
      <RadioG value={data.label} onChange={e => onLabel(e.target.value)}>
        <Radio value={'right' as Label}>正确识别</Radio>
        <Radio value={'wrong' as Label}>错误识别</Radio>
      </RadioG>
    </RecogBoxRoot>
  );
};

export default function index() {
  const [data, setData] = useState<{ [key: string]: data[0] }>();
  const router = useRouter();
  useEffect(() => {
    const id = getId(router);
    if (id) {
      APIGetRecog(id)
        .then(res =>
          setData(
            res.data.data.items.reduce(
              (a, c) => ({ ...a, [c.base + c.cap]: c }),
              {}
            )
          )
        )
        .catch(() => message.error('网络错误'));
    }
  }, []);
  const Entry = data ? Object.entries(data) : [];
  const TotalCount = Entry.length;
  const RightCount = Entry.filter(([k, v]) => v.label === Label.Right).length;
  const DupCount = Entry.filter(([k, v]) => v.dup && v.dup > 1).length;

  return (
    <MainLayout>
      <VBox>
        <ImageArea>
          {data
            ? _.chunk(Object.entries(data), 4).map((es, idx) => (
                <ImageRow key={`row${idx}`}>
                  {es.map(([k, v]) => (
                    <RecogCard
                      key={`${data[k].cap + data[k].base}`}
                      data={data[k]}
                      onLabel={label =>
                        setData(e => ({
                          ...e,
                          [v.base + v.cap]: {
                            ...data[k],
                            label: label,
                          },
                        }))
                      }
                    />
                  ))}
                </ImageRow>
              ))
            : null}
        </ImageArea>
        <span>
          {' '}
          总数:{TotalCount}正识数: {RightCount} 误识数:{TotalCount - RightCount}{' '}
          未通过数:0 重复数:{DupCount}
        </span>
        <SubmitButton
          type={'primary'}
          onClick={() =>
            Modal.confirm({
              content: '确认提交',
              onOk() {
                APICommitRecog({
                  taskid: getId(router).toString(),
                  items: Entry.map(([k, v]) => v),
                })
                  .then(() => message.success('提交成功'))
                  .catch(() => message.error('网络错误'));
              },
            })
          }
        >
          {' '}
          确认提交
        </SubmitButton>
      </VBox>
    </MainLayout>
  );
}
