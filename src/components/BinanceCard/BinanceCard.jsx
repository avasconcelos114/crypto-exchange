import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import api from '~api/index';
import { API_REFETCH_INTERVAL, EXCHANGES } from '~lib/constants';

import { selectPair } from '~store/pair';
import { setPrice, selectExchangePrice } from '~store/exchanges';

import Card from '~components/common/Card';

function BinanceCard(props) {
  const { onClick } = props;
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
  const price = useSelector(selectExchangePrice(EXCHANGES.BINANCE));
  const {
    error,
    data: response,
    refetch,
  } = useQuery(`api/${EXCHANGES.BINANCE}`, () => api[EXCHANGES.BINANCE].getTicker(pair), {
    enabled: Boolean(pair && pair.length > 0),
    refetchInterval: API_REFETCH_INTERVAL,
  });

  useEffect(() => {
    if (pair) {
      refetch();
    }
  }, [pair]);

  useEffect(() => {
    dispatch(setPrice({ exchange: EXCHANGES.BINANCE, price: response?.data?.price || null }));
  }, [response]);

  if (error || !price) {
    return <p>Could not find Binance data</p>;
  }
  return <Card exchange={EXCHANGES.BINANCE} price={price} onClick={onClick} />;
}

export default BinanceCard;
