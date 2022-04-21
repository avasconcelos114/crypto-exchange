import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import { API_REFETCH_INTERVAL, EXCHANGES } from '~lib/constants';
import { selectPair } from '~store/pair';
import { setPrice, selectExchangePrice } from '~store/exchanges';
import api from '~api/index';

import { mapValuesFromBitfinex } from '~lib/utils';

import Card from '~components/common/Card';

function BitfinexCard() {
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
  const formattedPair = pair.replace('/', '').toUpperCase();
  const price = useSelector(selectExchangePrice(EXCHANGES.BITFINEX));
  const {
    error,
    data: response,
    refetch,
  } = useQuery('getPairFromBitfinex', () => api.bitfinex.getTicker(formattedPair), {
    enabled: Boolean(formattedPair && formattedPair.length > 0),
    refetchInterval: API_REFETCH_INTERVAL,
  });

  useEffect(() => {
    if (pair) {
      refetch();
    }
  }, [pair]);

  useEffect(() => {
    if (response) {
      dispatch(
        setPrice({
          exchange: EXCHANGES.BITFINEX,
          price: Array.isArray(response?.data) ? mapValuesFromBitfinex(response.data).ask : null,
        }),
      );
    }
  }, [response]);

  if (error || !price) {
    return <p>Could not find Bitfinex data</p>;
  }
  return <Card exchangeName="Bitfinex" price={price} />;
}

export default BitfinexCard;
