import axios from 'axios';

import { formatUpper } from '~lib/utils';

export async function getTicker(symbol) {
  const formattedSymbol = formatUpper(symbol);
  return axios.get(`/v2/ticker/t${formattedSymbol}`);
}

export async function getRecentTrades(symbol) {
  const formattedSymbol = formatUpper(symbol);
  return axios.get(`/v2/trades/t${formattedSymbol}/hist`, {
    params: {
      limit: 10,
    },
  });
}
