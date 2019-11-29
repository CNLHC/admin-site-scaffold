import React, { useState } from 'react';
import { ImageRow, ImageCol, CheckAbleImage } from '../Common';
import styled from 'styled-components';
import { StaticRoot } from '../../../libs/constant/conf';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;
const Candidate = styled.div`
  height: 40rem;
  overflow: scroll;
  overflow-x: hidden;
  margin: 1rem;
`;
const Base = styled.div`
  height: 10rem;
  display: flex;
  justify-content: space-around;
`;
const ImageWrapper = styled.div`
  height: 100%;
  img {
    height: 100%;
    width: auto;
  }
`;

interface TLabel {
  candidates: string[][];
  base: string;
  onSelected: (e: string) => void;
}
export default function LabelPart({ candidates, base, onSelected }: TLabel) {
  const [check, setCheck] = useState<string | undefined>(undefined);
  return (
    <Root>
      <Base>
        <ImageWrapper>
          <img src={`${StaticRoot}${base}`} />
        </ImageWrapper>
      </Base>
      <Candidate>
        {candidates.map(es => (
          <ImageRow style={{ height: '10rem' }}>
            {es.map(e => (
              <CheckAbleImage
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
