import { useMemo } from 'react';
import * as styles from './Card.styles';

import ExchangeHeader from '~components/common/ExchangeHeader';

function Card(props) {
  const { data } = props;
  const { code, displayName, price } = data;

  const priceElement = useMemo(() => {
    if (price && Boolean(price)) {
      return (
        <div css={styles.priceWrapperStyle}>
          <p>{parseFloat(price).toFixed(2).toString()}</p>
        </div>
      );
    }

    return <p>No price found :(</p>;
  }, [price]);

  return (
    <div css={styles.baseStyle}>
      <ExchangeHeader code={code} displayName={displayName} />
      {priceElement}
    </div>
  );
}

export default Card;
