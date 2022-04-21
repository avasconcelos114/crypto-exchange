import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import api from '~api/index';
import { API_REFETCH_INTERVAL, EXCHANGES } from '~lib/constants';
import { mapValuesFromKraken } from '~lib/utils';
import { setPrice, selectExchangePrice } from '~store/exchanges';
import { selectPair } from '~store/pair';

import Card from '~components/common/Card';

function KrakenCard(props) {
  const { onClick } = props;
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
  const price = useSelector(selectExchangePrice(EXCHANGES.KRAKEN));

  const {
    error,
    data: response,
    refetch,
  } = useQuery('getPairFromKraken', () => api.kraken.getTicker(pair), {
    enabled: Boolean(pair && pair.length > 0),
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
        dispatch(setPrice({ exchange: EXCHANGES.KRAKEN, price: pairData?.ask || null }));
      }
      return;
    }
    dispatch(setPrice({ exchange: EXCHANGES.KRAKEN, price: null }));
  }, [response]);

  if (error || !price) {
    return <p>Could not find Kraken data</p>;
  }

  return <Card exchange={EXCHANGES.KRAKEN} price={price} onClick={onClick} />;
}

export default KrakenCard;
