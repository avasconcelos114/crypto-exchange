import React from 'react';

import KrakenSocket from '~lib/websockets/kraken';
import useSocket from '~hooks/useSocket';

import Card from '~components/common/Card';

function KrakenCard(props) {
  const { pair } = props;
  const values = useSocket(KrakenSocket, pair);

  if (!values) {
    return <></>;
  }

  return <Card exchangeName="Kraken" price={values.ask} />;
}

export default KrakenCard;
