import axios from 'axios';

import { formatUpper, mapValuesFromKraken } from '~lib/utils';

export async function getTicker(pair) {
  return new Promise(async (resolve, reject) => {
    const formattedPair = formatUpper(pair);
    try {
      const {
        data: { result = {} },
      } = await axios.get('/0/public/Ticker', {
        params: {
          pair: formattedPair,
        },
      });
      for (const key of Object.keys(result)) {
        const pairData = mapValuesFromKraken(result[key]);
        resolve(pairData?.ask || null);
      }
    } catch {
      reject(null);
    }
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
