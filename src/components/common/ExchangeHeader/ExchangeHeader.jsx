import React from 'react';
import * as styles from './ExchangeHeader.styles';

function ExchangeHeader(props) {
  const { code, displayName } = props;
  return (
    <div css={styles.headerWrapperStyle}>
      <img src={require(`~resources/img/${code}.png`)} alt={`${displayName} exchange logo`} />
      <h2>{displayName}</h2>
    </div>
  );
}

export default React.memo(ExchangeHeader);
