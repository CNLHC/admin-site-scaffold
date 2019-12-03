import React, { useState } from 'react';
import styled from 'styled-components';
import { StaticRoot } from '../../../libs/constant/conf';
import { ImageCol, ImageRow, CheckAbleImage, SubmitButton } from '../Common';
import { TaskInfo } from '../../../libs/API/get_relationalsdk';
import { Request } from '../../../libs/API/commit';
import { message, Button, Popover } from 'antd';
import _ from 'lodash';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Gallery = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Candidate = styled.div`
  width: 100%;
`;
interface TLabelBox {
  taskinfo: TaskInfo;
  AllCap: string[];
  onCommit: (payload: Omit<Request, 'taskid'>) => void;
}
const HBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default function LabelBox({ taskinfo, onCommit, AllCap }: TLabelBox) {
  const [check, setCheck] = useState<string | undefined>(undefined);
  const [more, setMore] = useState(false);
  const AllRow = (
    <>
      {_.chunk(AllCap, 5).map(es => (
        <ImageRow style={{ height: '10rem' }}>
          {es.map(e => (
            <CheckAbleImage
              imageUrl={`${e}`}
              checked={check === e}
              onCheck={v => setCheck(e)}
            />
          ))}
        </ImageRow>
      ))}
    </>
  );
  const AutoRow = (
    <>
      <ImageRow style={{ height: '10rem' }}>
        {taskinfo.labelPic.map(e => (
          <>
            <CheckAbleImage
              imageUrl={`${e.capPic}`}
              checked={check === e.capPic}
              onCheck={v => setCheck(e.capPic)}
              extra={{
                title: '期望概率',
                content: e.score.toString(),
              }}
              ColProps={{
                span: 4,
              }}
            />
          </>
        ))}
      </ImageRow>
      {more ? (
        <>
          {AllRow}
          <HBox>
            <Button onClick={() => setMore(false)} type={'primary'}>
              收起
            </Button>
          </HBox>
        </>
      ) : (
        <>
          <HBox>
            <Button onClick={() => setMore(true)} type={'primary'}>
              查看所有图片
            </Button>
          </HBox>
        </>
      )}
    </>
  );

  return (
    <Root>
      <Gallery>
        <ImageCol>
          <img src={`${StaticRoot}${taskinfo.basePic}`} />
        </ImageCol>
        <Candidate>{taskinfo.labelPic.length > 0 ? AutoRow : AllRow}</Candidate>
      </Gallery>
      <SubmitButton
        type={'primary'}
        onClick={() => {
          if (check)
            onCommit({
              baseimg: taskinfo.basePic,
              capimg: check,
            });
          else {
            message.warning('请至少选择一张图片');
          }
        }}
      >
        确认标注
      </SubmitButton>
    </Root>
  );
}
