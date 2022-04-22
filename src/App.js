import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { Global } from '@emotion/react';

import { EXCHANGES, SORT_TYPES } from '~lib/constants';
import { selectPair, setPair } from '~store/pair';
import { resetPrices, selectOrder, selectExchanges, setOrder } from '~store/exchanges';
import { openModal, selectIsOpen } from '~store/modal';

import Input from '~components/common/Input';
import Select from '~components/common/Select';
import ExchangeCard from '~components/ExchangeCard';

import globalStyles from './App.styles';

const DetailModal = React.lazy(() => import('~components/DetailModal'));

function App() {
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
  const order = useSelector(selectOrder);
  const exchanges = useSelector(selectExchanges);
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
      dispatch(setPair(`${pairFirst}/${pairSecond}`));
    }
  }, [pairMatch]);

  useEffect(() => {
    if (detailMatch?.isExact) {
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
      return <p>Input a valid pair to begin your search!</p>;
    }

    const cardMap = {
      [EXCHANGES.BINANCE]: <ExchangeCard exchange={EXCHANGES.BINANCE} />,
      [EXCHANGES.BITFINEX]: <ExchangeCard exchange={EXCHANGES.BITFINEX} />,
      [EXCHANGES.HUOBI]: <ExchangeCard exchange={EXCHANGES.HUOBI} />,
      [EXCHANGES.KRAKEN]: <ExchangeCard exchange={EXCHANGES.KRAKEN} />,
    };

    if (order === SORT_TYPES.ALPHABETIC) {
      const sorted = Object.keys(cardMap)
        .sort((a, b) => a < b)
        .map(key => cardMap[key]);
      return sorted;
    }

    if (order === SORT_TYPES.PRICE) {
      const sorted = Object.keys(exchanges)
        .sort((a, b) => {
          if (exchanges[a]?.price === null) {
            return 1;
          }
          if (exchanges[b]?.price === null) {
            return -1;
          }

          const exchangeA = parseFloat(exchanges[a]?.price || -1);
          const exchangeB = parseFloat(exchanges[b]?.price || -1);
          return exchangeB - exchangeA;
        })
        .map(key => cardMap[key]);
      return sorted;
    }
  }

  return (
    <>
      <Global styles={globalStyles} />
      <Input onChange={handleChange} onSubmit={handleSubmit} value={searchValue} />
      <Select onChange={handleSelectSort} />
      {generateCards()}

      {isModalOpen && <DetailModal />}
    </>
  );
}

export default App;
