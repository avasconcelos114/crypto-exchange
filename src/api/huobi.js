import axios from 'axios';

export async function getTicker(symbol) {
  return axios.get('/market/trade', {
    params: {
      symbol,
    },
  });
}

export async function getRecentTrades(symbol) {
  return axios.get('/market/history/trade', {
    params: {
      symbol,
    },
  });
}
