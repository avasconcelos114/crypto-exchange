import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { EXCHANGES, SORT_TYPES } from '~lib/constants';
import { selectPair, setPair } from '~store/pair';
import { resetPrices, selectOrder, selectExchanges, setOrder } from '~store/exchanges';
import { openModal } from '~store/modal';

import Input from '~components/common/Input';
import BinanceCard from '~components/BinanceCard';
import BitfinexCard from '~components/BitfinexCard';
import HuobiCard from '~components/HuobiCard';
import KrakenCard from '~components/KrakenCard';
import DetailModal from '~components/DetailModal';

function App() {
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
  const order = useSelector(selectOrder);
  const exchanges = useSelector(selectExchanges);

  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const pairMatch = useRouteMatch('/:pairFirst/:pairSecond');
  const detailMatch = useRouteMatch('/:pairFirst/:pairSecond/:exchange/details');

  useEffect(() => {
    if (pairMatch) {
      const {
        params: { pairFirst, pairSecond },
      } = pairMatch;
      dispatch(setPair(`${pairFirst}/${pairSecond}`));
    }
  }, [pairMatch]);

  useEffect(() => {
    if (detailMatch) {
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

  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  function handleSubmit() {
    history.push(`/${searchValue}`);
  }

  function handleSelectSort(e) {
    dispatch(setOrder(e.target.value));
  }

  function handleOpenModal(exchange) {
    history.push(`/${pair}/${exchange}/details`);
  }

  function generateCards() {
    const cardMap = {
      [EXCHANGES.BINANCE]: <BinanceCard onClick={handleOpenModal} />,
      [EXCHANGES.BITFINEX]: <BitfinexCard onClick={handleOpenModal} />,
      [EXCHANGES.HUOBI]: <HuobiCard onClick={handleOpenModal} />,
      [EXCHANGES.KRAKEN]: <KrakenCard onClick={handleOpenModal} />,
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
    <div className="App">
      <Input handleChange={handleChange} value={searchValue} />
      <button type="button" onClick={handleSubmit}>
        GO
      </button>
      <select onChange={handleSelectSort}>
        {Object.keys(SORT_TYPES).map(type => (
          <option key={type} value={SORT_TYPES[type]}>
            {type}
          </option>
        ))}
      </select>
      {generateCards()}

      <DetailModal />
    </div>
  );
}

export default App;
