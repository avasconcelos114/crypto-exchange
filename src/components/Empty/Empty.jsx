import { ReactComponent as EmptyImage } from '~resources/img/empty.svg';

import * as styles from './Empty.styles';

function Empty() {
  return (
    <div css={styles.baseStyle}>
      <h3>Type something in the searchbar to begin!</h3>
      <EmptyImage />
    </div>
  );
}

export default Empty;
