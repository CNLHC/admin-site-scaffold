import React, { useState, useEffect } from 'react';
import MainLayout from '../../../components/Layout';
import {
  Response,
  APIGetRelationReview,
} from '../../../libs/API/get_relationreview';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { message, Button } from 'antd';
import { ImageRow } from '../../../components/tasklist/Common';
import ImageDiff from '../../../components/tasklist/ImageDiff';
import { StaticRoot } from '../../../libs/constant/conf';
import LabelPart from '../../../components/tasklist/labelPart';
import {
  Response as AllResponse,
  APIGetAllCapture,
} from '../../../libs/API/filter_allcapture';
import styled from 'styled-components';
import { APIDeleteLabel } from '../../../libs/API/delete_label';
import { APICommit } from '../../../libs/API/commit';
const ButtonG = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-evenly;
`;
const PartLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function index() {
  const [data, setData] = useState<Response | undefined>(undefined);
  const [all, setAll] = useState<AllResponse | undefined>(undefined);
  const [partLabel, setPartLabel] = useState<{
    capimg: string;
    labelimg: string;
    adjacent: string;
  }>(undefined);
  const [partSelected, setPartSelected] = useState<string | undefined>();
  const router = useRouter();
  const id = router.query.id;
  const UpdateReview = id =>
    APIGetRelationReview(id)
      .then(res => setData(res.data))
      .catch(e => message.error('网络错误'));
  useEffect(() => {
    if (typeof id === 'string' && parseInt(id)) {
      UpdateReview(id);
      APIGetAllCapture(id)
        .then(res => setAll(res.data))
        .catch(e => message.error('网络错误'));
    }
  }, [id]);
  if (!data || !all) return <MainLayout>{null}</MainLayout>;
  else if (partLabel)
    return (
      <MainLayout>
        <PartLayout>
          <LabelPart
            onSelected={e => {
              return setPartSelected(e);
            }}
            base={partLabel.labelimg}
            candidates={_.chunk(
              all.data.map(e => e.capimg),
              6
            )}
          />
          <ButtonG>
            <Button
              onClick={() =>
                APIDeleteLabel({
                  baseimg: partLabel.labelimg,
                  taskid: parseInt(id as string),
                })
                  .then(() => {
                    message.success('取消关联成功');
                    UpdateReview(id);
                    setPartLabel(undefined);
                    setPartSelected(undefined);
                  })
                  .catch(() => message.error('网络错误'))
              }
            >
              {' '}
              取消关联{' '}
            </Button>
            <Button
              onClick={() =>
                partSelected
                  ? APICommit({
                      baseimg: partLabel.labelimg,
                      capimg: partSelected,
                      taskid: id as string,
                    })
                      .then(res => {
                        message.success('更新关联成功');
                        UpdateReview(id);
                        setPartLabel(undefined);
                        setPartSelected(undefined);
                      })
                      .catch(() => message.error('网络错误'))
                  : message.warning('请至少选择一张图片')
              }
            >
              更新关联
            </Button>
            <Button onClick={() => setPartLabel(undefined)}> 返回 </Button>
          </ButtonG>
        </PartLayout>
      </MainLayout>
    );
  else
    return (
      <MainLayout>
        {_.chunk(data.data.pairs, 5).map(es => (
          <ImageRow style={{ height: '10rem' }}>
            {es.map(e => (
              <ImageDiff
                onClick={() => {
                  return setPartLabel({
                    capimg: e.capture,
                    labelimg: e.labelpic,
                    adjacent: ``,
                  });
                }}
                leftUrl={`${StaticRoot}${e.capture}`}
                rightUrl={`${StaticRoot}${e.labelpic}`}
              />
            ))}
          </ImageRow>
        ))}
      </MainLayout>
    );
}
