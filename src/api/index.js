import * as binance from './binance';
import * as bitfinex from './bitfinex';
import * as kraken from './kraken';
import * as huobi from './huobi';

import { EXCHANGES } from '~lib/constants';

const apis = {
  [EXCHANGES.BINANCE]: binance,
  [EXCHANGES.BITFINEX]: bitfinex,
  [EXCHANGES.KRAKEN]: kraken,
  [EXCHANGES.HUOBI]: huobi,
};

export default apis;
