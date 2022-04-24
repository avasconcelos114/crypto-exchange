import axios from 'axios';

import { formatUpper } from '~lib/utils';

export async function getTicker(symbol) {
  return new Promise(async (resolve, reject) => {
    const formattedSymbol = formatUpper(symbol);
    try {
      const {
        data: { price },
      } = await axios.get('/api/v3/ticker/price', {
        params: {
          symbol: formattedSymbol,
        },
      });
      const response = price && price.length > 0 ? parseFloat(price) : null;
      resolve(response);
    } catch {
      reject(null);
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
