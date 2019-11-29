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
import ImageDiff from '../../../components/tasklist/ImageDiff';
import {
  NormalRecogCard,
  CarRecogCard,
} from '../../../components/tasklist/recog/RecogBox';

type data = Response['data']['items'];

export default function index() {
  const [data, setData] = useState<{ [key: string]: data[0] }>({});
  const [meta, setMeta] = useState<Response | undefined>(undefined);
  const router = useRouter();
  const id = getId(router);
  useEffect(() => {
    if (id) {
      APIGetRecog(id)
        .then(res => {
          setData(
            res.data.data.items.reduce(
              (a, c) => ({ ...a, [c.base + c.cap]: c }),
              {}
            )
          );
          setMeta(res.data);
        })
        .catch(() => message.error('网络错误'));
    }
  }, [id]);
  const Entry = data ? Object.entries(data) : [];
  const TotalCount = Entry.length;
  const RightCount = Entry.filter(([k, v]) => v.label === Label.Right).length;
  const DupCount = Entry.filter(([k, v]) => v.dup && v.dup > 1).length;
  if (!meta) return <MainLayout>{null}</MainLayout>;

  return (
    <MainLayout>
      <VBox>
        <ImageArea>
          {data
            ? _.chunk(Object.entries(data), 4).map((es, idx) => (
                <ImageRow key={`row${idx}`}>
                  {es.map(([k, v]) =>
                    meta.data.nametype !== '车牌' ? (
                      <NormalRecogCard
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
                    ) : (
                      <CarRecogCard
                        key={`${data[k].cap + data[k].exif}`}
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
                    )
                  )}
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
