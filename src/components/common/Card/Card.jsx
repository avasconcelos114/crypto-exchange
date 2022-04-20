import * as styles from './Card.styles';

function Card(props) {
  const { exchangeName, price } = props;
  return (
    <div css={styles.baseStyle}>
      <h2>{exchangeName}</h2>
      <p>{price}</p>
    </div>
  );
}

export default Card;
