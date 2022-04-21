import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import { API_REFETCH_INTERVAL } from '~lib/constants';
import { selectPair } from '~store/pair';
import api from '~api/index';

import Card from '~components/common/Card';

function BinanceCard() {
  const pair = useSelector(selectPair);
  const formattedPair = pair.replace('/', '').toUpperCase();
  const [price, setPrice] = useState(null);
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
      setPrice(data.price);
    }
  }, [response]);

  if (error || !price) {
    return <p>Could not find Binance data</p>;
  }
  return <Card exchangeName="Binance" price={price} />;
}

export default BinanceCard;
