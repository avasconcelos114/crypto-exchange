import { useRef } from 'react';
import * as styles from './Input.styles';

function Input(props) {
  const inputRef = useRef(null);
  const { type = 'text', onChange, onSubmit, value } = props;

  function handleKeyUp(e) {
    if (e?.key === 'Enter') {
      inputRef.current?.blur();
    }
  }

  return (
    <input
      ref={inputRef}
      type={type}
      value={value || ''}
      css={styles.baseStyle}
      onChange={onChange}
      onKeyUp={handleKeyUp}
      onBlur={onSubmit}
    />
  );
}

export default Input;
