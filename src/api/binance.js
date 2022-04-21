import axios from 'axios';

import { formatUpper } from '~lib/utils';

export async function getTicker(symbol) {
  const formattedSymbol = formatUpper(symbol);
  return axios.get('/api/v3/ticker/price', {
    params: {
      symbol: formattedSymbol,
    },
  });
}

export async function getRecentTrades(symbol) {
  const formattedSymbol = formatUpper(symbol);
  return axios.get('/api/v3/trades', {
    params: {
      symbol: formattedSymbol,
      limit: 10,
    },
  });
}
