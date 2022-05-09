import axios from 'axios';

import { formatUpper, mapValuesFromKraken } from '~lib/utils';

export async function getTicker(pair, signal) {
  return new Promise(async resolve => {
    const formattedPair = formatUpper(pair);
    try {
      const {
        data: { result = {} },
      } = await axios.get('/0/public/Ticker', {
        signal,
        params: {
          pair: formattedPair,
        },
      });
      for (const key of Object.keys(result)) {
        const pairData = mapValuesFromKraken(result[key]);
        resolve({ price: pairData.ask, error: null });
      }
    } catch {
      resolve({ price: null, error: 'Could not retrieve data' });
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
