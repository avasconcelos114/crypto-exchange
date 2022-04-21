import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { EXCHANGES, SORT_TYPES } from '~lib/constants';
import { selectPair, setPair } from '~store/pair';
import { resetPrices, selectOrder, selectExchanges, setOrder } from '~store/exchanges';

import Input from '~components/common/Input';
import BinanceCard from '~components/BinanceCard';
import BitfinexCard from '~components/BitfinexCard';
import HuobiCard from '~components/HuobiCard';
import KrakenCard from '~components/KrakenCard';

function App() {
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
  const order = useSelector(selectOrder);
  const exchanges = useSelector(selectExchanges);

  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const pairMatch = useRouteMatch('/:pairFirst/:pairSecond');
  // const detailMatch = useMatch('/:pairFirst/:pairSecond/details');

  useEffect(() => {
    if (pairMatch) {
      const {
        params: { pairFirst, pairSecond },
      } = pairMatch;
      dispatch(setPair(`${pairFirst}/${pairSecond}`));
    }
  }, [pairMatch]);

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

  function generateCards() {
    const cardMap = {
      [EXCHANGES.BINANCE]: <BinanceCard />,
      [EXCHANGES.BITFINEX]: <BitfinexCard />,
      [EXCHANGES.HUOBI]: <HuobiCard />,
      [EXCHANGES.KRAKEN]: <KrakenCard />,
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
    </div>
  );
}

export default App;
