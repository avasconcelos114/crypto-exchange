// color tokens
const colors = {
  gray100: '#F8FAFB',
  gray200: '#F3F4F6',
  primary: '#6371EC',
  black: '#000',
  white: '#fff',
  green100: '#D0F4DA',
  green200: '#23CC62',
  pink100: '#FED8EB',
  pink200: '#FF74B9',
};

// semantic tokens
const input = {
  borderColor: colors.gray200,
  color: colors.black,
};

const card = {
  backgroundColor: colors.white,
  borderColor: colors.gray200,
  color: colors.black,

  hover: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
};

const palette = {
  colors,
  card,
  input,
};

export default palette;
