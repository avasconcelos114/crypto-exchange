import { css } from '@emotion/react';

import palette from '~lib/palette';

export const baseStyle = css`
  background-color: ${palette.card.backgroundColor};
  border: 1px solid ${palette.card.borderColor};
  color: ${palette.card.color};
  border-radius: 8px;
  padding: 20px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:hover {
    background-color: ${palette.card.hover.backgroundColor};
    border: 1px solid ${palette.card.backgroundColor};
    color: ${palette.card.hover.color};
    cursor: pointer;
  }
`;

export const headerWrapperStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: auto;
    height: 25px;
    margin-right: 10px;
  }

  h2 {
    margin: 15px 0px;
  }
`;

export const priceWrapperStyle = css`
  font-size: 28px;
  font-weight: 700;

  p {
    margin: 0px auto 0px 0px;
  }
`;
