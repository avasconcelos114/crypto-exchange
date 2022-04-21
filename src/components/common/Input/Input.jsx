function Input(props) {
  const { type = 'text', handleChange, value } = props;

  return <input type={type} onChange={handleChange} value={value} />;
}

export default Input;
