import { gunzip, strFromU8 } from 'fflate';

import BaseSocket from './index';

export default class HuobiSocket extends BaseSocket {
  constructor({ onMessageCallback, pair }) {
    super({ url: 'wss://api.huobi.pro/ws' });

    this.onMessageCallback = onMessageCallback;
    this.pair = pair;

    this.socket.onopen = this.onOpen;
    this.socket.onmessage = this.onMessage;
  }

  onOpen = () => {
    // Senting ping in intervals to maintain connection
    this.subscribeTicker(this.pair);
  };

  onMessage = async event => {
    const reader = new FileReader();
    reader.onload = () => {
      gunzip(new Uint8Array(reader.result), this.handleGunzipCallback);
    };
    reader.readAsArrayBuffer(event.data);
  };

  handleGunzipCallback = (err, raw) => {
    if (err) {
      console.error(err);
      return;
    }

    const data = JSON.parse(strFromU8(raw));

    if (data?.ping) {
      // Responding ping from server
      this.socket.send(JSON.stringify({ pong: data.ping }));
      return;
    }

    if (data?.tick) {
      this.onMessageCallback(data.tick);
    }
  };

  subscribeTicker = pair => {
    const formattedPair = pair.replace('/', '').toLowerCase();
    const payload = { sub: `market.${formattedPair}.ticker` };
    this.socket.send(JSON.stringify(payload));
  };
}
