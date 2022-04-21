/* As Bitfinex prevents us from running requests directly to their servers,
 * We'll be running a proxy middleware locally for a quick bypass
 * Ideally we should have a node server that implements all API interfaces
 * that could be easily accessible from the client
 * ex: /api/binance/getTicker?symbol=BTCUSD
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/v2',
    createProxyMiddleware({
      target: 'https://api-pub.bitfinex.com',
      changeOrigin: true,
    }),
  );

  app.use(
    '/api/v3',
    createProxyMiddleware({
      target: 'https://api.binance.com',
      changeOrigin: true,
    }),
  );

  app.use(
    '/market',
    createProxyMiddleware({
      target: 'https://api.huobi.pro',
      changeOrigin: true,
    }),
  );

  app.use(
    '/0/public',
    createProxyMiddleware({
      target: 'https://api.kraken.com',
      changeOrigin: true,
    }),
  );
};
