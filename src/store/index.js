import { configureStore } from '@reduxjs/toolkit';

import pair from './pair';
import exchanges from './exchanges';
import modal from './modal';

export const store = configureStore({
  reducer: { pair, exchanges, modal },
});
