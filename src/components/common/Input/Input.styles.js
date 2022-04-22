import { css } from '@emotion/react';
import palette from '~lib/palette';

export const baseStyle = css`
  height: 25px;
  padding: 8px;
  border: 1px solid ${palette.input.borderColor};
  border-radius: 8px;
  color: ${palette.input.color};
`;
