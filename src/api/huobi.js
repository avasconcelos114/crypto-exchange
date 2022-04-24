import axios from 'axios';

import { formatLower } from '~lib/utils';

export async function getTicker(symbol, signal) {
  return new Promise(async resolve => {
    const formattedSymbol = formatLower(symbol);
    try {
      const {
        data: { tick },
      } = await axios.get('/market/trade', {
        signal,
        params: {
          symbol: formattedSymbol,
        },
      });
      const price = tick.data[0].price;
      resolve({ price, error: null });
    } catch {
      resolve({ price: null, error: 'Could not retrieve data' });
    }
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
