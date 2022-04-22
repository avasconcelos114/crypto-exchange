import * as styles from './Card.styles';

import ExchangeHeader from '~components/common/ExchangeHeader';

function Card(props) {
  const { data } = props;
  const { code, displayName, price } = data;

  function generatePriceElement() {
    if (price && Boolean(price)) {
      return (
        <div css={styles.priceWrapperStyle}>
          <p>{parseFloat(price).toFixed(2).toString()}</p>
        </div>
      );
    }

    // We could also just exclude these from being displayed by returning null
    return <p>Unsupported trading pair :(</p>;
  }

  return (
    <div css={styles.baseStyle}>
      <ExchangeHeader code={code} displayName={displayName} />
      {generatePriceElement()}
    </div>
  );
}

export default Card;
