import React, { useState } from 'react';

import BinanceCard from '~components/BinanceCard';
import BitfinexCard from '~components/BitfinexCard';
import HuobiCard from '~components/HuobiCard';
import KrakenCard from '~components/KrakenCard';

function App() {
  const [pair, setPair] = useState('BTC/USDT');

  return (
    <div className="App">
      <h2>{pair}</h2>
      <BinanceCard pair={pair} />
      <BitfinexCard pair={pair} />
      <HuobiCard pair={pair} />
      <KrakenCard pair={pair} />
    </div>
  );
}

export default App;
