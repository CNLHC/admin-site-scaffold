import React, { useState } from 'react';
import { ImageRow, ImageCol, CheckAbleImage, ImageWrapper } from '../Common';
import styled from 'styled-components';
import { StaticRoot } from '../../../libs/constant/conf';
import { useTypedSelector } from '../../../libs/store';

const Root = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const Candidate = styled.div`
  width: 100%;
  height: 60vh;
  overflow: scroll;
  overflow-x: hidden;
  margin: 1rem;
  padding: 5rem;
`;
const Base = styled.div`
  height: 20vh;
  height: 10rem;
  display: flex;
  justify-content: space-around;
`;

interface TLabel {
  candidates: string[][];
  base: string;
  onSelected: (e: string) => void;
}
export default function LabelPart({ candidates, base, onSelected }: TLabel) {
  const [check, setCheck] = useState<string | undefined>(undefined);
  const grid = useTypedSelector(e => e.GridSettingReducer);

  return (
    <Root>
      <Base>
        <ImageWrapper>
          <img src={`${StaticRoot}${base}`} />
        </ImageWrapper>
      </Base>
      <Candidate>
        {candidates.map(es => (
          <ImageRow rowHeight={grid.rowHeight}>
            {es.map(e => (
              <CheckAbleImage
                grid={grid}
                imageUrl={e}
                checked={check === e}
                onCheck={() => {
                  onSelected(e);
                  setCheck(e);
                }}
                ColProps={{ span: 4 }}
              />
            ))}
          </ImageRow>
        ))}
      </Candidate>
    </Root>
  );
}
