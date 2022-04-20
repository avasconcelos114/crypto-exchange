import React from 'react';

import BinanceSocket from '~lib/websockets/binance';

import useSocket from '~hooks/useSocket';

import Card from '~components/common/Card';

function BinanceCard(props) {
  const { pair } = props;
  const values = useSocket(BinanceSocket, pair);

  if (!values) {
    return <></>;
  }

  return <Card exchangeName="Binance" price={values.ask} />;
}

export default BinanceCard;
