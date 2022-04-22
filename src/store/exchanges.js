import { createSlice } from '@reduxjs/toolkit';
import { EXCHANGES, SORT_TYPES } from '~lib/constants';

const initialState = {
  data: {
    [EXCHANGES.BINANCE]: {
      code: EXCHANGES.BINANCE,
      displayName: 'Binance',
      price: null,
    },
    [EXCHANGES.BITFINEX]: {
      code: EXCHANGES.BITFINEX,
      displayName: 'Bitfinex',
      price: null,
    },
    [EXCHANGES.KRAKEN]: {
      code: EXCHANGES.KRAKEN,
      displayName: 'Kraken',
      price: null,
    },
    [EXCHANGES.HUOBI]: {
      code: EXCHANGES.HUOBI,
      displayName: 'Huobi',
      price: null,
    },
  },
  order: SORT_TYPES.ALPHABETIC,
};

export const exchangesSlice = createSlice({
  name: 'exchanges',
  initialState,
  reducers: {
    setPrice: (state, action) => {
      const { exchange, price } = action.payload;
      state.data[exchange].price = price;
    },
    resetPrices: state => {
      for (const key of Object.keys(state.data)) {
        state.data[key].price = null;
      }
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const selectExchanges = state => state.exchanges.data;
export const selectExchangeData = exchange => state => state.exchanges.data[exchange];
export const selectOrder = state => state.exchanges.order;

export const { setPrice, resetPrices, setOrder } = exchangesSlice.actions;

export default exchangesSlice.reducer;
