import React, { Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { Global } from '@emotion/react';

import { EXCHANGES, SORT_TYPES } from '~lib/constants';
import { sortExchanges } from '~lib/utils';
import { selectPair, setPair } from '~store/pair';
import { resetPrices, selectOrder, selectExchanges, setOrder } from '~store/exchanges';
import { openModal, selectIsOpen } from '~store/modal';

import Input from '~components/common/Input';
import Select from '~components/common/Select';
import ExchangeCard from '~components/ExchangeCard';
import Empty from '~components/Empty';

import globalStyles from './App.styles';

const DetailModal = React.lazy(() => import('~components/DetailModal'));

function App() {
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
  const order = useSelector(selectOrder);
  const exchangeData = useSelector(selectExchanges);
  const isModalOpen = useSelector(selectIsOpen);

  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const location = useLocation();
  const pairMatch = useRouteMatch('/:pairFirst/:pairSecond');
  const detailMatch = useRouteMatch('/:pairFirst/:pairSecond/:exchange/details');

  useEffect(() => {
    if (pairMatch?.isExact) {
      const {
        params: { pairFirst, pairSecond },
      } = pairMatch;
      const newPair = `${pairFirst}/${pairSecond}`;
      if (newPair !== pair) {
        dispatch(setPair(newPair));
      }
    }
  }, [pairMatch]);

  useEffect(() => {
    if (detailMatch && !isModalOpen) {
      const {
        params: { pairFirst, pairSecond, exchange },
      } = detailMatch;
      const newPair = `${pairFirst}/${pairSecond}`;
      dispatch(setPair(newPair));
      dispatch(openModal({ exchange, pair: newPair }));
    }
  }, [detailMatch]);

  useEffect(() => {
    dispatch(resetPrices());
    if (searchValue !== pair) {
      setSearchValue(pair);
    }
  }, [pair]);

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(setPair(null));
      dispatch(resetPrices());
    }
  }, [location.pathname]);

  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  function handleSubmit() {
    history.push(`/${searchValue}`);
  }

  function handleSelectSort(e) {
    dispatch(setOrder(e.target.value));
  }

  function generateCards() {
    if (!pair) {
      return <Empty />;
    }

    const cardMap = {};
    for (const key of Object.keys(EXCHANGES)) {
      cardMap[EXCHANGES[key]] = <ExchangeCard exchange={EXCHANGES[key]} />;
    }

    return React.Children.toArray(sortExchanges({ sortType: order, exchangeData, cardMap }));
  }

  return (
    <>
      <Global styles={globalStyles} />
      <Input onChange={handleChange} onSubmit={handleSubmit} value={searchValue} />
      <Select onChange={handleSelectSort} />
      {generateCards()}

      {isModalOpen && (
        <Suspense fallback="">
          <DetailModal />
        </Suspense>
      )}
    </>
  );
}

export default App;
