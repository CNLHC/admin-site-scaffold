import React from 'react';
import styled from 'styled-components';
import { Col } from 'antd';
import Img from 'react-image';
import * as Fallback from '../../assets/fallback.jpg';

const DiffCol = styled(Col)`
  padding: 0.5rem;
  display: flex;
  height: 100%;
  justify-content: flex-start;
  cursor: pointer;
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
interface TImageDiff {
  onClick: () => void;
  leftUrl: string;
  rightUrl: string;
}

export default function ImageDiff({ onClick, leftUrl, rightUrl }: TImageDiff) {
  return (
    <DiffCol onClick={onClick}>
      <DiffImgWrapper>
        <Img src={[leftUrl, Fallback]} />
      </DiffImgWrapper>
      <DiffImgWrapper>
        <Img src={[rightUrl, Fallback]} />
      </DiffImgWrapper>
    </DiffCol>
  );
}
