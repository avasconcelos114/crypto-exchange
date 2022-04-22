import { useMemo } from 'react';
import * as styles from './Card.styles';

function Card(props) {
  const { data, onClick } = props;
  const { code, displayName, price } = data;

  function handleClick() {
    onClick && onClick(code);
  }

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
    <div css={styles.baseStyle} onClick={handleClick}>
      <div css={styles.headerWrapperStyle}>
        <img src={require(`~resources/img/${code}.png`)} alt={`${displayName} exchange logo`} />
        <h2>{displayName}</h2>
      </div>
      {priceElement}
    </div>
  );
}

export default Card;
