import React, { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';

import BinanceCard from '~components/BinanceCard';
import BitfinexCard from '~components/BitfinexCard';
import HuobiCard from '~components/HuobiCard';
import KrakenCard from '~components/KrakenCard';

function App() {
  const pairMatch = useMatch('/:pairFirst/:pairSecond');
  const detailMatch = useMatch('/:pairFirst/:pairSecond/details');
  const [pair, setPair] = useState('ETH/USD');

  useEffect(() => {
    if (pairMatch) {
      const {
        params: { pairFirst, pairSecond },
      } = pairMatch;
      setPair(`${pairFirst}/${pairSecond}`);
    }
  }, [pairMatch]);

  return (
    <div className="App">
      <h2>{pair}</h2>
      {/* <BinanceCard pair={pair} /> */}
      {/* <BitfinexCard pair={pair} /> */}
      <HuobiCard pair={pair} />
      {/* <KrakenCard pair={pair} /> */}
    </div>
  );
}

export default App;
