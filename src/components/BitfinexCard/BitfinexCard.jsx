import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import { API_REFETCH_INTERVAL } from '~lib/constants';
import { selectPair } from '~store/pair';
import api from '~api/index';

import { mapValuesFromBitfinex } from '~lib/utils';

import Card from '~components/common/Card';

function BitfinexCard() {
  const pair = useSelector(selectPair);
  const formattedPair = pair.replace('/', '').toUpperCase();
  const [price, setPrice] = useState(null);
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
    if (response && response.data) {
      const { data } = response;
      const tickerData = mapValuesFromBitfinex(data);
      setPrice(tickerData.ask);
    }
  }, [response]);

  if (error || !price) {
    return <p>Could not find Bitfinex data</p>;
  }
  return <Card exchangeName="Bitfinex" price={price} />;
}

export default BitfinexCard;
