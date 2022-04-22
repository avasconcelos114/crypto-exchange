import { SORT_TYPES } from '~lib/constants';

import * as styles from './Select.styles';

function Select(props) {
  const { onChange } = props;
  return (
    <select onChange={onChange} css={styles.baseStyle}>
      {Object.keys(SORT_TYPES).map(type => (
        <option key={type} value={SORT_TYPES[type]}>
          {type}
        </option>
      ))}
    </select>
  );
}

export default Select;
