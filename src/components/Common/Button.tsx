import styled from 'styled-components';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

export const NewButton = styled((props: ButtonProps) => (
  <Button {...props} size={'large'} type={'primary'} />
))`
  margin-bottom: 1rem;
`;
