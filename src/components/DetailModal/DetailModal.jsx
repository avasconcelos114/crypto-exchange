import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';

import palette from '~lib/palette';
import { selectTradeData, selectActiveExchange, setClose } from '~store/modal';
import { selectPair } from '~store/pair';

import ExchangeHeader from '~components/common/ExchangeHeader';
import TradeHeader from '~components/common/TradeHeader';
import TradeEntry from '~components/common/TradeEntry';

Modal.setAppElement('#root');

const styleOverrides = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    position: 'absolute',
    width: '80%',
    margin: '0 auto',
    border: 'none',
    background: palette.modal.backgroundColor,
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
  },
};

function DetailModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const pair = useSelector(selectPair);
  const { code, displayName } = useSelector(selectActiveExchange);
  const data = useSelector(selectTradeData);

  function handleCloseModal() {
    dispatch(setClose());
    history.push(`/${pair}`);
  }

  return (
    <Modal isOpen={true} onRequestClose={handleCloseModal} style={styleOverrides}>
      <ExchangeHeader code={code} displayName={displayName} />
      <TradeHeader />
      {data &&
        data.length > 0 &&
        React.Children.toArray(data.map(item => <TradeEntry data={item} />))}
    </Modal>
  );
}

export default DetailModal;
