import styled from 'styled-components';
import { Button, Col, Row, Icon } from 'antd';
import { ColProps } from 'antd/lib/col';
import { StaticRoot } from '../../libs/constant/conf';

export const ImageWrapper = styled.div`
  height: 100%;
  img {
    height: 100%;
    width: auto;
  }
`;

export const getId = (router: any) => {
  const idstr: string | string[] | undefined = router.query.id;
  const id: number | undefined =
    idstr && typeof idstr === 'string' && parseInt(idstr);
  return id;
};

export const VBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const SubmitButton = styled(Button)`
  margin: 2.5rem 1rem;
  width: 50%;
  height: 2.5rem;
`;
export const ImageArea = styled.div`
  width: 100%;
`;


export const ImageRow = styled(Row)`
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;
export const ImageCol = styled(Col)`
  width: 15rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
  cursor: pointer;
  img {
    height: 100%;
    width: auto;
    max-width: 15rem;
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

export const BigIcon = styled(Icon)`
  margin: 0.5rem;
  font-size: 2rem;
`;

interface TImage {
  imageUrl: string;
  checked: boolean;
  onCheck: (e: boolean) => void;
  ColProps?: ColProps;
}

export const CheckAbleImage = ({
  imageUrl,
  checked,
  onCheck,
  ColProps,
}: TImage) => (
  <ImageCol {...ColProps} onClick={() => onCheck(checked)}>
    <img src={`${StaticRoot}${imageUrl}`} />
    <BigIcon
      type="check-circle"
      style={{ color: checked ? '#73d13d' : '#e8e8e8' }}
    />
  </ImageCol>
);
