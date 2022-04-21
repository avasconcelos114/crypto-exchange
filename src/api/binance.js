import axios from 'axios';

export async function getTicker(symbol) {
  return axios.get('/api/v3/ticker/price', {
    params: {
      symbol,
    },
  });
}

export async function getRecentTrades(symbol) {
  return axios.get('/api/v3/trades', {
    params: {
      symbol,
    },
  });
}
