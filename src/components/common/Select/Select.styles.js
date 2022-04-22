import { css } from '@emotion/react';
import palette from '~lib/palette';

export const baseStyle = css`
  height: 42px;
  text-indent: 10px;
  width: 150px;
  margin-left: 10px;
  border: 1px solid ${palette.input.borderColor};
  border-radius: 8px;
  color: ${palette.input.color};
`;
