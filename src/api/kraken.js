import axios from 'axios';

export async function getTicker(pair) {
  return axios.get('/0/public/Ticker', {
    params: {
      pair,
    },
  });
}

export async function getRecentTrades(pair) {
  return axios.get('/0/public/Trades', {
    params: {
      pair,
    },
  });
}
