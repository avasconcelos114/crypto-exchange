import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import { API_REFETCH_INTERVAL } from '~lib/constants';
import { selectPair } from '~store/pair';
import api from '~api/index';

import Card from '~components/common/Card';

function HuobiCard() {
  const pair = useSelector(selectPair);
  const formattedPair = pair.replace('/', '').toLowerCase();
  const [price, setPrice] = useState(null);
  const {
    error,
    data: response,
    refetch,
  } = useQuery('getPairFromHuobi', () => api.huobi.getTicker(formattedPair), {
    enabled: Boolean(formattedPair && formattedPair.length > 0),
    refetchInterval: API_REFETCH_INTERVAL,
  });

  useEffect(() => {
    if (pair) {
      refetch();
    }
  }, [pair]);

  useEffect(() => {
    if (response && response?.data?.tick) {
      const {
        tick: { data = [] },
      } = response?.data;

      if (data.length > 0) {
        setPrice(data[0]?.price || null);
      }
    }
  }, [response]);

  if (error || !price) {
    return <p>Could not find huobi data</p>;
  }
  return <Card exchangeName="Huobi" price={price} />;
}

export default HuobiCard;
