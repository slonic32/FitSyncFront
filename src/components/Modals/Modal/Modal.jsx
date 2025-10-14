import Modal from 'react-modal';
import css from './Modal.module.css';
import { AiOutlineClose } from 'react-icons/ai';

Modal.setAppElement('#root');
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(100, 100, 100, 0.55)',
  },
};

export default function Modals({
  styleVariantBtn,
  styleVariant,
  isOpen,
  closeModal,
  children,
}) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className={css[styleVariant]}
      >
        {children}
        <button
          type="button"
          className={css[styleVariantBtn]}
          onClick={closeModal}
        >
          <AiOutlineClose />
        </button>
      </Modal>
    </>
  );
}
