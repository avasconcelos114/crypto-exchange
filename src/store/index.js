import { configureStore } from '@reduxjs/toolkit';
import pair from './pair';

export const store = configureStore({
  reducer: { pair },
});
