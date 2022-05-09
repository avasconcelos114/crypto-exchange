import axios from 'axios';

import { formatUpper, mapValuesFromBitfinex } from '~lib/utils';

export async function getTicker(symbol, signal) {
  return new Promise(async resolve => {
    const formattedSymbol = formatUpper(symbol);
    try {
      const { data } = await axios.get(`/v2/ticker/t${formattedSymbol}`, { signal });
      if (Array.isArray(data) && typeof data[0] === 'number') {
        if (data[0] === 'error') {
          resolve({ price: null, error: 'Could not retrieve data' });
          return;
        }

        const response = mapValuesFromBitfinex(data);
        resolve({ price: response?.ask, error: null });
      }
    } catch {
      resolve({ price: null, error: 'Could not retrieve data' });
    }
  });
}

export async function getRecentTrades(symbol) {
  const formattedSymbol = formatUpper(symbol);
  return axios.get(`/v2/trades/t${formattedSymbol}/hist`, {
    params: {
      limit: 10,
    },
  });
}
