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
      state.data = Object.assign([], action.payload);
    },
  },
});

export const selectIsOpen = state => state.modal.isOpen;
export const selectLoadingState = state => state.modal.loadingState;
export const selectActiveExchange = state => state.modal.activeExchange;
export const selectTradeData = state => state.modal.data;

export const { setOpen, setClose, setLoading, setData } = actions;

export const openModal = createAsyncThunk(`${name}/openModal`, async (params, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;
  const { pair, exchange } = params;
  const {
    exchanges: { data: exchangeData },
  } = getState();
  dispatch(setOpen(exchangeData[exchange]));
  dispatch(setLoading(LOADING_STATE.LOADING));

  try {
    const { data: response } = await api[exchange].getRecentTrades(pair);
    let tradeData = [];
    switch (exchange) {
      case EXCHANGES.BINANCE:
        tradeData = response
          .map(item => {
            const { time: timestamp, qty: amount, price } = item;
            return { timestamp, amount, price };
          })
          .reverse();
        break;
      case EXCHANGES.BITFINEX:
        tradeData = response.map(item => {
          const [_, timestamp, amount, price] = item;
          return { timestamp, amount, price };
        });
        break;
      case EXCHANGES.HUOBI:
        tradeData = response?.data.map(item => {
          const { ts: timestamp, amount, price } = item.data[0];
          return { timestamp, amount, price };
        });
        break;
      case EXCHANGES.KRAKEN:
        const key = Object.keys(response.result)[0];
        tradeData = response.result[key]
          ?.map(item => {
            const [price, amount, timestamp] = item;
            return { timestamp, amount, price };
          })
          .slice(0, 20)
          .reverse();
        break;
      default:
    }
    dispatch(setData(tradeData));
    dispatch(setLoading(LOADING_STATE.SUCCESS));
  } catch (e) {
    dispatch(setLoading(LOADING_STATE.ERROR));
    console.error(e);
  }
});

export default reducer;
