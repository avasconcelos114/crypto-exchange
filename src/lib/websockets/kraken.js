import { WEBSOCKET_PING_INTERVAL } from '~lib/constants';
import { mapValuesFromKraken } from '~lib/utils';

import BaseSocket from './index';

export default class KrakenSocket extends BaseSocket {
  constructor({ onMessageCallback, pair }) {
    super({ url: 'wss://ws.kraken.com' });

    this.onMessageCallback = onMessageCallback;
    this.pair = pair;

    this.socket.onopen = this.onOpen;
    this.socket.onmessage = this.onMessage;
  }

  onOpen = () => {
    // client-side ping required to maintain connection
    setInterval(this.sendPing, WEBSOCKET_PING_INTERVAL);
    this.subscribeTicker([this.pair]);
  };

  onMessage = event => {
    const message = JSON.parse(event.data);
    if (Array.isArray(message)) {
      const [_, values, type] = message;
      if (type && type === 'ticker') {
        this.onMessageCallback(mapValuesFromKraken(values));
      }
    }
  };

  sendPing = () => {
    this.socket.send(JSON.stringify({ event: 'ping' }));
  };

  subscribeTicker = pair => {
    const payload = {
      event: 'subscribe',
      pair,
      subscription: {
        name: 'ticker',
      },
    };

    this.socket.send(JSON.stringify(payload));
  };
}
