import styled from 'styled-components';
import { Response, APIGetRecog, Label } from '../../../libs/API/get_recog';
import RadioGroup from 'antd/lib/radio/group';
import ImageDiff from '../ImageDiff';
import { StaticRoot } from '../../../libs/constant/conf';
import { Radio } from 'antd';
import { ImageWrapper } from '../Common';

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

const RadioG = styled(RadioGroup)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
type data = Response['data']['items'];

interface TImageBox {
  data: data[0];
  onLabel: (l: Label) => void;
}
export const NormalRecogCard = ({ data, onLabel }: TImageBox) => {
  return (
    <RecogBoxRoot
      style={{ background: data.dup && data.dup > 1 ? '#ffe7ba' : null }}
    >
      <ImageDiff
        onClick={() =>
          onLabel(data.label === 'wrong' ? Label.Right : Label.Wrong)
        }
        leftUrl={`${StaticRoot}${data.base}`}
        rightUrl={`${StaticRoot}${data.cap}`}
      />
      <RadioG value={data.label} onChange={e => onLabel(e.target.value)}>
        <Radio value={'right' as Label}>正确识别</Radio>
        <Radio value={'wrong' as Label}>错误识别</Radio>
      </RadioG>
    </RecogBoxRoot>
  );
};

const CarCardRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 8rem;
`;
const CarCardHead = styled.span``;
const CarCardBottom = styled.div`
  display: flex;
  height: 100%;
  width: 20rem;
`;
const CarImageArea = styled.div`
  height: 100%;
  flex-basis: 70%;
`;
export const CarRecogCard = ({ data, onLabel }: TImageBox) => {
  return (
    <CarCardRoot
      style={{ background: data.dup && data.dup > 1 ? '#ffe7ba' : null }}
    >
      <CarCardHead>
        Exif:{data.exif}({data.guess})
      </CarCardHead>
      <CarCardBottom>
        <CarImageArea>
          <ImageWrapper>
            <img
              onClick={() =>
                onLabel(data.label === 'wrong' ? Label.Right : Label.Wrong)
              }
              src={`${StaticRoot}${data.cap}`}
            ></img>
          </ImageWrapper>
        </CarImageArea>
        <RadioG value={data.label} onChange={e => onLabel(e.target.value)}>
          <Radio value={'right' as Label}>正确识别</Radio>
          <Radio value={'wrong' as Label}>错误识别</Radio>
        </RadioG>
      </CarCardBottom>
    </CarCardRoot>
  );
};
