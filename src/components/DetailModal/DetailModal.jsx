import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';

import { selectIsOpen, selectTradeData, selectActiveExchange, setClose } from '~store/modal';
import { selectPair } from '~store/pair';

Modal.setAppElement('#root');

function DetailModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const pair = useSelector(selectPair);
  const isModalOpen = useSelector(selectIsOpen);
  const exchange = useSelector(selectActiveExchange);
  const data = useSelector(selectTradeData);

  function handleCloseModal() {
    dispatch(setClose());
    history.push(`/${pair}`);
  }

  return (
    <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} contentLabel="Example Modal">
      <p>{exchange}</p>
      {data && data.length > 0 && data.map(item => <p key={item.timestamp}>price: {item.price}</p>)}
    </Modal>
  );
}

export default DetailModal;
