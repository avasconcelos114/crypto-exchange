import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import api from '~api/index';
import { API_REFETCH_INTERVAL, EXCHANGES } from '~lib/constants';
import { mapValuesFromBitfinex } from '~lib/utils';
import { setPrice, selectExchangePrice } from '~store/exchanges';
import { selectPair } from '~store/pair';

import Card from '~components/common/Card';

function BitfinexCard(props) {
  const { onClick } = props;
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
  const price = useSelector(selectExchangePrice(EXCHANGES.BITFINEX));
  const {
    error,
    data: response,
    refetch,
  } = useQuery('getPairFromBitfinex', () => api.bitfinex.getTicker(pair), {
    enabled: Boolean(pair && pair.length > 0),
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
  return <Card exchange={EXCHANGES.BITFINEX} price={price} onClick={onClick} />;
}

export default BitfinexCard;
