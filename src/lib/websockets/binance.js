import BaseSocket from './index';
import { mapValuesFromBinance } from '~lib/utils';

export default class BinanceSocket extends BaseSocket {
  constructor({ onMessageCallback, pair }) {
    super({ url: 'wss://stream.binance.com:9443/ws' });

    this.onMessageCallback = onMessageCallback;
    this.pair = pair;

    this.socket.onopen = this.onOpen;
    this.socket.onmessage = this.onMessage;
  }

  onOpen = () => {
    this.subscribeTicker(this.pair);
  };

  onMessage = event => {
    const message = JSON.parse(event.data);
    if (message?.e === '24hrTicker') {
      this.onMessageCallback(mapValuesFromBinance(message));
    }
  };

  subscribeTicker = pair => {
    const formattedPair = pair.replace('/', '').toLowerCase();
    const payload = {
      method: 'SUBSCRIBE',
      params: [`${formattedPair}@ticker`],
      id: 1,
    };

    this.socket.send(JSON.stringify(payload));
  };
}
