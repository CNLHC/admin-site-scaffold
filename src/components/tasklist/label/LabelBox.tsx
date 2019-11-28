import React, { useState } from 'react';
import styled from 'styled-components';
import { StaticRoot } from '../../../libs/constant/conf';
import { ImageCol, ImageRow, CheckAbleImage, SubmitButton } from '../Common';
import { TaskInfo } from '../../../libs/API/get_relationalsdk';
import { Request } from '../../../libs/API/commit';
import { message } from 'antd';

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
  onCommit: (payload: Omit<Request, 'taskid'>) => void;
}

export default function LabelBox({ taskinfo, onCommit }: TLabelBox) {
  const [check, setCheck] = useState<string | undefined>(undefined);
  return (
    <Root>
      <Gallery>
        <ImageCol>
          <img src={`${StaticRoot}${taskinfo.basePic}`} />
        </ImageCol>
        <Candidate>
          <ImageRow>
            {taskinfo.labelPic.map(e => (
              <CheckAbleImage
                imageUrl={`${StaticRoot}${e.capPic}`}
                checked={check === e.capPic}
                onCheck={v => setCheck(e.capPic)}
                ColProps={{
                  span: 4,
                }}
              />
            ))}
          </ImageRow>
        </Candidate>
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
