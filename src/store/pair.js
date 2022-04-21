import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const pairSlice = createSlice({
  name: 'pair',
  initialState,
  reducers: {
    setPair: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const selectPair = state => state.pair.value;
export const { setPair } = pairSlice.actions;

export default pairSlice.reducer;
