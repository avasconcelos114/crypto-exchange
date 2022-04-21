import * as styles from './Card.styles';

function Card(props) {
  const { exchange, price, onClick } = props;

  function handleClick() {
    onClick && onClick(exchange);
  }

  return (
    <div css={styles.baseStyle} onClick={handleClick}>
      <h2>{exchange}</h2>
      <p>{price}</p>
    </div>
  );
}

export default Card;
