import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '~api/index';
import { EXCHANGES, LOADING_STATE } from '~lib/constants';

const initialState = {
  isOpen: false,
  loadingState: LOADING_STATE.IDLE,
  activeExchange: null,
  data: [],
};

export const { actions, reducer, name } = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = true;
      state.activeExchange = action.payload;
    },
    setClose: state => {
      state.isOpen = false;
      state.loadingState = LOADING_STATE.IDLE;
      state.activeExchange = null;
    },
    setLoading: (state, action) => {
      state.loadingState = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const selectIsOpen = state => state.modal.isOpen;
export const selectLoadingState = state => state.modal.loadingState;
export const selectActiveExchange = state => state.modal.activeExchange;
export const selectTradeData = state => state.modal.data;

export const { setOpen, setClose, setLoading, setData } = actions;

export const openModal = createAsyncThunk(`${name}/openModal`, async (params, thunkAPI) => {
  const { dispatch } = thunkAPI;
  const { pair, exchange } = params;
  dispatch(setOpen(exchange));
  dispatch(setLoading(LOADING_STATE.LOADING));

  try {
    const { data: response } = await api[exchange].getRecentTrades(pair);
    let data = [];
    switch (exchange) {
      case EXCHANGES.BINANCE:
        data = response.map(item => {
          const { time: timestamp, qty: amount, price } = item;
          return { timestamp, amount, price };
        });
        break;
      case EXCHANGES.BITFINEX:
        data = response.map(item => {
          const [_, timestamp, amount, price] = item;
          return { timestamp, amount, price };
        });
        break;
      case EXCHANGES.HUOBI:
        data = response?.data.map(item => {
          const { ts: timestamp, amount, price } = item.data[0];
          return { timestamp, amount, price };
        });
        break;
      case EXCHANGES.KRAKEN:
        const key = Object.keys(response.result)[0];
        data = response.result[key]
          ?.map(item => {
            const [price, amount, timestamp] = item;
            return { timestamp, amount, price };
          })
          .slice(0, 10);
        break;
      default:
    }
    dispatch(setData(data));
    dispatch(setLoading(LOADING_STATE.SUCCESS));
  } catch (e) {
    dispatch(setLoading(LOADING_STATE.ERROR));
    console.error(e);
  }
});

export default reducer;
