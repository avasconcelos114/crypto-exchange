import { configureStore } from '@reduxjs/toolkit';
import pair from './pair';
import exchanges from './exchanges';

export const store = configureStore({
  reducer: { pair, exchanges },
});
