import axios from 'axios';

import { formatLower } from '~lib/utils';

export async function getTicker(symbol) {
  const formattedSymbol = formatLower(symbol);
  return axios.get('/market/trade', {
    params: {
      symbol: formattedSymbol,
    },
  });
}

export async function getRecentTrades(symbol) {
  const formattedSymbol = formatLower(symbol);
  return axios.get('/market/history/trade', {
    params: {
      symbol: formattedSymbol,
      size: 10,
    },
  });
}
