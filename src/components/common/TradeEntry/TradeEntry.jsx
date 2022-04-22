import { useMemo } from 'react';
import dayjs from 'dayjs';

import * as styles from './TradeEntry.styles';

function TradeEntry(props) {
  const { timestamp, price, amount } = props.data;
  const formattedTimestamp = useMemo(() => {
    return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss.SSS');
  }, [timestamp]);

  return (
    <div css={styles.baseStyle}>
      <span>{formattedTimestamp}</span>
      <span>{parseFloat(price).toFixed(2).toString()}</span>
      <span>{amount}</span>
    </div>
  );
}

export default TradeEntry;
