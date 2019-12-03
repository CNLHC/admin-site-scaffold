import React from 'react';
import styled from 'styled-components';
import { Col } from 'antd';
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
        <img src={leftUrl} />
      </DiffImgWrapper>
      <DiffImgWrapper>
        <img src={rightUrl} />
      </DiffImgWrapper>
    </DiffCol>
  );
}
