import axios from 'axios';

import { formatLower } from '~lib/utils';

export async function getTicker(symbol, signal) {
  return new Promise(async (resolve, reject) => {
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
      const response = tick && tick?.data.length > 0 ? tick.data[0]?.price : null;
      resolve(response);
    } catch {
      reject(null);
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
