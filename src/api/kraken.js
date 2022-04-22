import axios from 'axios';

import { formatUpper } from '~lib/utils';

export async function getTicker(pair) {
  const formattedPair = formatUpper(pair);
  return axios.get('/0/public/Ticker', {
    params: {
      pair: formattedPair,
    },
  });
}

export async function getRecentTrades(pair) {
  const formattedPair = formatUpper(pair);
  return axios.get('/0/public/Trades', {
    params: {
      pair: formattedPair,
    },
  });
}
