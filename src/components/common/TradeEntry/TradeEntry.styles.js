import { css } from '@emotion/react';
import palette from '~lib/palette';

export const baseStyle = css`
  width: 100%;
  height: 35px;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${palette.card.backgroundColor};
  border: 1px solid ${palette.card.borderColor};
  font-size: 14px;

  &:hover {
    background-color: ${palette.card.hover.backgroundColor};
    border: 1px solid ${palette.card.backgroundColor};
    color: ${palette.card.hover.color};
  }

  span {
    display: block;
    width: 100%;
    text-align: center;
  }
`;
