import axios from 'axios';

export async function getTicker(symbol) {
  return axios.get(`/v2/ticker/t${symbol}`);
}

export async function getRecentTrades(symbol) {
  return axios.get(`/v2/trades/t${symbol}/hist`);
}
