import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import { API_REFETCH_INTERVAL, EXCHANGES } from '~lib/constants';
import { selectPair } from '~store/pair';
import { setPrice, selectExchangePrice } from '~store/exchanges';
import api from '~api/index';

import Card from '~components/common/Card';

function BinanceCard() {
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
  const formattedPair = pair.replace('/', '').toUpperCase();
  const price = useSelector(selectExchangePrice(EXCHANGES.BINANCE));
  const {
    error,
    data: response,
    refetch,
  } = useQuery('getPairFromBinance', () => api.binance.getTicker(formattedPair), {
    enabled: Boolean(formattedPair && formattedPair.length > 0),
    refetchInterval: API_REFETCH_INTERVAL,
  });

  useEffect(() => {
    if (pair) {
      refetch();
    }
  }, [pair]);

  useEffect(() => {
    if (response && response.data) {
      const { data } = response;
      dispatch(setPrice({ exchange: EXCHANGES.BINANCE, price: data?.price || null }));
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      dispatch(setPrice({ exchange: EXCHANGES.BINANCE, price: null }));
    }
  }, [error]);

  if (error || !price) {
    return <p>Could not find Binance data</p>;
  }
  return <Card exchangeName="Binance" price={price} />;
}

export default BinanceCard;
