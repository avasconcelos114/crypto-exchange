import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import api from '~api/index';
import { API_REFETCH_INTERVAL, EXCHANGES } from '~lib/constants';
import { mapValuesFromKraken, mapValuesFromBitfinex } from '~lib/utils';
import { setPrice, selectExchangeData } from '~store/exchanges';
import { selectPair } from '~store/pair';

import Card from '~components/common/Card';

function ExchangeCard(props) {
  const { exchange } = props;
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
  const exchangeData = useSelector(selectExchangeData(exchange));
  const {
    data: response,
    refetch,
    error,
  } = useQuery(`api/getTicker/${exchange}`, () => api[exchange].getTicker(pair), {
    enabled: Boolean(pair && pair.length > 0),
    refetchInterval: API_REFETCH_INTERVAL,
  });

  useEffect(() => {
    if (pair) {
      refetch();
    }
  }, [pair]);

  function getPriceFromResponse(response) {
    let price = null;

    switch (exchange) {
      case EXCHANGES.BINANCE:
        price = response?.data?.price || null;
        break;
      case EXCHANGES.BITFINEX:
        const data = response?.data;
        price = data[0] !== 'error' ? mapValuesFromBitfinex(response?.data)?.ask : null;
        break;
      case EXCHANGES.HUOBI:
        if (response?.data?.tick) {
          const {
            tick: { data = [] },
          } = response?.data;

          if (data.length > 0) {
            price = data[0]?.price || null;
          }
        }
        break;
      case EXCHANGES.KRAKEN:
        const { result = {} } = response?.data;
        for (const key of Object.keys(result)) {
          const pairData = mapValuesFromKraken(result[key]);
          price = pairData?.ask || null;
        }
        break;
      default:
    }

    if (error) {
      price = null;
    }
    dispatch(setPrice({ exchange, price }));
  }

  useEffect(() => {
    if (response && response?.data) {
      getPriceFromResponse(response);
    }
  }, [response]);

  function getDestinationLink() {
    // Preventing user from opening modal of an exchange that has no data
    if (exchangeData?.price) {
      return `/${pair}/${exchange}/details`;
    }
    return `/${pair}`;
  }

  return (
    <Link style={{ textDecoration: 'none' }} to={getDestinationLink()}>
      <Card data={exchangeData} />
    </Link>
  );
}

export default ExchangeCard;