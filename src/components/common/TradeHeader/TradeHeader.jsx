import * as styles from './TradeHeader.styles';

function TradeEntry() {
  return (
    <div css={styles.baseStyle}>
      <span>Time</span>
      <span>Price</span>
      <span>Amount</span>
    </div>
  );
}

export default TradeEntry;
