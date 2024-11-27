import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modal/slice'; 
import { selectIsOpenModal, selectTypeModal } from '../../redux/modal/selectors'; 
import styles from './Modal.module.css'; 

const ModalWindow = ({ children }) => {
  const dispatch = useDispatch();
  
  const isOpen = useSelector(selectIsOpenModal);
  const modalType = useSelector(selectTypeModal);

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '15px',
      backgroundColor: 'white',
      boxShadow: '0 4px 50px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '100%',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModalHandler}
      style={customStyles}
      contentLabel="Example Modal"
      className={styles.modalOverlay}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.modalContent}>
        <button className={styles.btnClose} onClick={closeModalHandler}>&times;</button>
        
        <div className={styles.modalHeader}>
          <h2>{modalType}</h2>
        </div>
        
        <div>{children}</div>
        
        <div className={styles.modalFooter}>
          <button className={styles.successButton} onClick={closeModalHandler}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalWindow;
