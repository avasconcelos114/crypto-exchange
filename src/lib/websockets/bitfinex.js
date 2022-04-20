import BaseSocket from './index';
import { mapValuesFromBitfinex } from '~lib/utils';

export default class BitfinexSocket extends BaseSocket {
  constructor({ onMessageCallback, pair }) {
    super({ url: 'wss://api-pub.bitfinex.com/ws/2' });

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
    if (Array.isArray(message) && Array.isArray(message[1])) {
      this.onMessageCallback(mapValuesFromBitfinex(message[1]));
    }
  };

  subscribeTicker = pair => {
    const formattedPair = `t${pair.replace('/', '').toUpperCase()}`;
    const payload = {
      event: 'subscribe',
      channel: 'ticker',
      symbol: formattedPair,
    };

    this.socket.send(JSON.stringify(payload));
  };
}
