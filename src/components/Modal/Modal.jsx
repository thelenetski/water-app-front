import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modal/slice';
import { selectIsOpenModal } from '../../redux/modal/selectors';
import css from './Modal.module.css';

const ModalWindow = ({ onSuccess, children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModal);

  const onClose = () => {
    dispatch(closeModal());
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={css.modalBackdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={css.modalContainer}>
        <button className={css.btnClose} onClick={onClose} aria-label="Close Modal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M6 18L18 6M6 6l12 12" stroke="#323F47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <header>
          <h2>Notification</h2>
        </header>
        <main>
          <div className={css.body}>{children}</div>
        </main>
        <footer className={css.modalFooter}>
          <button className={css.successButton} onClick={onSuccess}>
            Confirm
          </button>
          <button className={css.declineButton} onClick={onClose}>
            Decline
          </button>
        </footer>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

ModalWindow.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalWindow;
