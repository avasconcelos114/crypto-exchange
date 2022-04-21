import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import api from '~api/index';
import { API_REFETCH_INTERVAL, EXCHANGES } from '~lib/constants';

import { selectPair } from '~store/pair';
import { selectExchangePrice, setPrice } from '~store/exchanges';

import Card from '~components/common/Card';

function HuobiCard(props) {
  const { onClick } = props;
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
  const price = useSelector(selectExchangePrice(EXCHANGES.HUOBI));

  const {
    error,
    data: response,
    refetch,
  } = useQuery('getPairFromHuobi', () => api.huobi.getTicker(pair), {
    enabled: Boolean(pair && pair.length > 0),
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
        dispatch(setPrice({ exchange: EXCHANGES.HUOBI, price: data[0]?.price || null }));
      }
      return;
    }

    dispatch(setPrice({ exchange: EXCHANGES.HUOBI, price: null }));
  }, [response]);

  if (error || !price) {
    return <p>Could not find Huobi data</p>;
  }
  return <Card exchange={EXCHANGES.HUOBI} price={price} onClick={onClick} />;
}

export default HuobiCard;
