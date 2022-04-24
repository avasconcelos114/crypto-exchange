import React, { useEffect, useState } from 'react';
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
  const [isEnabled, setEnabled] = useState(true);

  const {
    data: price,
    refetch,
    isError,
  } = useQuery(`api/getTicker/${exchange}`, ({ signal }) => api[exchange].getTicker(pair, signal), {
    enabled: isEnabled,
    refetchInterval: API_REFETCH_INTERVAL,
  });

  useEffect(() => {
    if (pair && pair.length > 0) {
      refetch();
    } else {
      setEnabled(false);
    }
  }, [pair]);

  useEffect(() => {
    setEnabled(!isError);
  }, [isError]);

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
