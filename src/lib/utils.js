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

export function mapValuesFromBinance(values) {
  const {
    a: ask,
    A: askSize,
    b: bid,
    B: bidSize,
    c: lastPrice,
    p: dailyChange,
    h: high,
    l: low,
    v: volume,
  } = values;

  return { ask, askSize, bid, bidSize, dailyChange, lastPrice, volume, high, low };
}
