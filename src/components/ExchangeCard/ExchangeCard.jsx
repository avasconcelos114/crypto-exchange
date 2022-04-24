import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import api from '~api/index';
import { API_REFETCH_INTERVAL } from '~lib/constants';
import { setPrice, selectExchangeData } from '~store/exchanges';
import { selectPair } from '~store/pair';

import Card from '~components/common/Card';

function ExchangeCard(props) {
  const { exchange } = props;
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
  const exchangeData = useSelector(selectExchangeData(exchange));
  const { data: price, refetch } = useQuery(
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

  useEffect(() => {
    dispatch(setPrice({ exchange, price }));
  }, [price]);

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
