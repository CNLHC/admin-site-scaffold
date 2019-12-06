import styled from 'styled-components';
import { Button, Col, Row, Icon, Popover } from 'antd';
import { ColProps } from 'antd/lib/col';
import { StaticRoot } from '../../libs/constant/conf';
import { RowProps } from 'antd/lib/row';
import { TState } from '../../libs/state/grid';
import { RowState } from 'antd/lib/grid/row';

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

interface ExtendedRow extends RowProps, Partial<Omit<TState, 'align'>> {}

export const ImageRow = styled(Row)<ExtendedRow>`
  height: ${({ rowHeight }) => `${rowHeight}rem`};
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;

interface TImage {
  imageUrl: string;
  checked: boolean;
  onCheck: (e: boolean) => void;
  extra?: {
    title: string;
    content: string;
  };

  ColProps?: ColProps;
  grid: TState;
}

interface ExtendsColProps extends ColProps, TState {
  selected: boolean;
}
export const ImageCol = styled(Col)<ExtendsColProps>`
  display: flex;
  flex-grow: 1;
  justify-content: ${({ align }) =>
    align === 'left'
      ? 'flex-start'
      : align === 'right'
      ? 'flex-end'
      : 'space-around'};
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  background: ${({ selected }) => (selected ? '#d9f7be' : '')};
  img {
    height: 100%;
    width: auto;
  }

  &:hover {
    transform: scale(${({ zoomCoef }) => zoomCoef});
    z-index: 10;
  }
`;

export const BigIcon = styled(Icon)`
  font-size: 2rem;
  position: absolute;
`;

export const CheckAbleImage = ({
  imageUrl,
  checked,
  onCheck,
  ColProps,
  extra,
  grid,
}: TImage) => {
  return (
    <ImageCol
      selected={checked}
      {...ColProps}
      {...grid}
      onClick={() => onCheck(checked)}
    >
      {extra ? (
        <Popover title={extra.title} content={extra.content}>
          <img src={`${StaticRoot}${imageUrl}`} />
        </Popover>
      ) : (
        <img src={`${StaticRoot}${imageUrl}`} />
      )}

      {checked ? (
        <BigIcon
          type="check-circle"
          style={{ color: checked ? '#73d13d' : '#e8e8e8' }}
        />
      ) : null}
    </ImageCol>
  );
};
