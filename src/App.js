import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { selectPair, setPair } from '~store/pair';

import Input from '~components/common/Input';
import BinanceCard from '~components/BinanceCard';
import BitfinexCard from '~components/BitfinexCard';
import HuobiCard from '~components/HuobiCard';
import KrakenCard from '~components/KrakenCard';

function App() {
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
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

  return (
    <div className="App">
      <h2>{pair}</h2>
      <Input handleChange={handleChange} value={searchValue} />
      <button type="button" onClick={handleSubmit}>
        GO
      </button>
      <BinanceCard />
      <BitfinexCard />
      <HuobiCard />
      <KrakenCard />
    </div>
  );
}

export default App;
