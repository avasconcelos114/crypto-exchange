import React from 'react';

import HuobiSocket from '~lib/websockets/huobi';
import useSocket from '~hooks/useSocket';

import Card from '~components/common/Card';

function HuobiCard(props) {
  const { pair } = props;
  const values = useSocket(HuobiSocket, pair);

  if (!values) {
    return <></>;
  }

  return <Card exchangeName="Huobi" price={values.ask} />;
}

export default HuobiCard;
