import { createSlice } from '@reduxjs/toolkit';
import { EXCHANGES, SORT_TYPES } from '~lib/constants';

const initialState = {
  data: {
    [EXCHANGES.BINANCE]: {
      displayName: 'Binance',
      icon: '',
      price: null,
    },
    [EXCHANGES.BITFINEX]: {
      displayName: 'Bitfinex',
      icon: '',
      price: null,
    },
    [EXCHANGES.KRAKEN]: {
      displayName: 'Kraken',
      icon: '',
      price: null,
    },
    [EXCHANGES.HUOBI]: {
      displayName: 'Huobi',
      icon: '',
      price: null,
    },
  },
  order: SORT_TYPES.PRICE,
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
export const selectExchangePrice = exchange => state => state.exchanges.data[exchange].price;
export const selectOrder = state => state.exchanges.order;

export const { setPrice, resetPrices, setOrder } = exchangesSlice.actions;

export default exchangesSlice.reducer;
