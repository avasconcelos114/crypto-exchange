import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import { selectPair } from '~store/pair';
import { API_REFETCH_INTERVAL } from '~lib/constants';
import api from '~api/index';

import { mapValuesFromKraken } from '~lib/utils';

import Card from '~components/common/Card';

function KrakenCard() {
  const pair = useSelector(selectPair);
  const formattedPair = pair.replace('/', '').toUpperCase();
  const [price, setPrice] = useState(null);
  const {
    error,
    data: response,
    refetch,
  } = useQuery('getPairFromKraken', () => api.kraken.getTicker(formattedPair), {
    enabled: Boolean(formattedPair && formattedPair.length > 0),
    refetchInterval: API_REFETCH_INTERVAL,
  });

  useEffect(() => {
    if (pair) {
      refetch();
    }
  }, [pair]);

  useEffect(() => {
    if (response && response?.data?.result) {
      const { result } = response?.data;
      for (const key of Object.keys(result)) {
        const pairData = mapValuesFromKraken(result[key]);
        setPrice(pairData?.ask || null);
      }
    }
  }, [response]);

  if (error || !price) {
    return <p>Could not find Kraken data</p>;
  }

  return <Card exchangeName="Kraken" price={price} />;
}

export default KrakenCard;
