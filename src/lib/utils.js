import React from 'react';
import { SORT_TYPES } from '~lib/constants';

// We only really need the Ask price, but mapping everything just in case
// Typescript would have made this somewhat more intuitive
export function mapValuesFromKraken(values) {
  const { a, b, c, v, p, t, h, o } = values;
  return {
    ask: a[0],
    bid: b[0],
    close: {
      price: c[0],
      lotVolume: c[1],
    },
    volume: {
      today: v[0],
      last24Hours: v[1],
    },
    volumeWeightedAveragePrice: {
      today: p[0],
      last24Hours: p[1],
    },
    trades: {
      today: t[0],
      last24Hours: t[1],
    },
    high: h[0],
    openPrice: {
      today: o[0],
      last24Hours: o[1],
    },
  };
}

export function mapValuesFromBitfinex(values) {
  const [
    bid,
    bidSize,
    ask,
    askSize,
    dailyChange,
    dailyChangeRelative,
    lastPrice,
    volume,
    high,
    low,
  ] = values;

  return {
    ask,
    askSize,
    bid,
    bidSize,
    dailyChange,
    dailyChangeRelative,
    lastPrice,
    volume,
    high,
    low,
  };
}

export function formatUpper(symbol) {
  return symbol.replace('/', '').toUpperCase();
}

export function formatLower(symbol) {
  return symbol.replace('/', '').toLowerCase();
}

export function sortExchanges({ sortType, exchangeData, cardMap }) {
  if (sortType === SORT_TYPES.ALPHABETIC) {
    return Object.keys(cardMap)
      .sort((a, b) => a < b)
      .map(key => cardMap[key]);
  }

  if (sortType === SORT_TYPES.PRICE) {
    const sorted = Object.keys(exchangeData)
      .sort((a, b) => {
        if (exchangeData[a]?.price === null) {
          return 1;
        }
        if (exchangeData[b]?.price === null) {
          return -1;
        }
        const exchangeA = parseFloat(exchangeData[a]?.price || -1);
        const exchangeB = parseFloat(exchangeData[b]?.price || -1);
        return exchangeB - exchangeA;
      })
      .map(key => cardMap[key]);
    return sorted;
  }
}
