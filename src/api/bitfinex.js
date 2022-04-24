import axios from 'axios';

import { formatUpper, mapValuesFromBitfinex } from '~lib/utils';

export async function getTicker(symbol) {
  return new Promise(async (resolve, reject) => {
    const formattedSymbol = formatUpper(symbol);
    try {
      const { data } = await axios.get(`/v2/ticker/t${formattedSymbol}`);
      if (Array.isArray(data) && typeof data[0] === 'number') {
        const response = mapValuesFromBitfinex(data);
        resolve(response?.ask || null);
        return;
      }
      resolve(null);
    } catch {
      reject(null);
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
