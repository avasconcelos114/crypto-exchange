export default class BaseSocket {
  constructor({ url }) {
    this.socket = new WebSocket(url);

    this.socket.onerror = this.onError;
    this.socket.onclose = this.onClose;
  }

  onError = event => {
    console.log('onError');
    console.log(event);
  };

  onClose = event => {
    console.log('onClose');
    console.log(event);
  };
}
