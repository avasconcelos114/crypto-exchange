import axios from 'axios';

import { formatUpper } from '~lib/utils';

export async function getTicker(symbol, signal) {
  return new Promise(async resolve => {
    const formattedSymbol = formatUpper(symbol);
    try {
      const {
        data: { price: priceReponse },
      } = await axios.get('/api/v3/ticker/price', {
        signal,
        params: {
          symbol: formattedSymbol,
        },
      });
      const price = parseFloat(priceReponse);
      resolve({ price, error: null });
    } catch {
      resolve({ price: null, error: 'Could not return data' });
    }
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
