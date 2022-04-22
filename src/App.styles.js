import { css } from '@emotion/react';
import palette from '~lib/palette';

const globalStyles = css`
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: ${palette.colors.gray100};
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue',
      'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  }

  #root {
    padding: 20px;
  }
`;

export default globalStyles;
