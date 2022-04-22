import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import api from '~api/index';
import { API_REFETCH_INTERVAL, EXCHANGES } from '~lib/constants';
import { mapValuesFromKraken, mapValuesFromBitfinex } from '~lib/utils';
import { setPrice, selectExchangeData } from '~store/exchanges';
import { selectPair } from '~store/pair';

import Card from '~components/common/Card';

function ExchangeCard(props) {
  const { onClick, exchange } = props;
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
  const exchangeData = useSelector(selectExchangeData(exchange));

  const { data: response, refetch } = useQuery(
    `api/getTicker/${exchange}`,
    () => api[exchange].getTicker(pair),
    {
      enabled: Boolean(pair && pair.length > 0),
      refetchInterval: API_REFETCH_INTERVAL,
    },
  );

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
        price = Array.isArray(response?.data) ? mapValuesFromBitfinex(response.data).ask : null;
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
        const { result } = response?.data;
        for (const key of Object.keys(result)) {
          const pairData = mapValuesFromKraken(result[key]);
          price = pairData?.ask || null;
        }
        break;
      default:
    }
    dispatch(setPrice({ exchange, price }));
  }

  useEffect(() => {
    if (response && response?.data) {
      getPriceFromResponse(response);
    }
  }, [response]);

  return <Card data={exchangeData} onClick={onClick} />;
}

export default ExchangeCard;
