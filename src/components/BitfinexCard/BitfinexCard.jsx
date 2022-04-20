import React from 'react';

import BitfinexSocket from '~lib/websockets/bitfinex';
import useSocket from '~hooks/useSocket';

import Card from '~components/common/Card';

function BitfinexCard(props) {
  const { pair } = props;
  const values = useSocket(BitfinexSocket, pair);

  if (!values) {
    return <></>;
  }

  return <Card exchangeName="Bitfinex" price={values.ask} />;
}

export default BitfinexCard;
