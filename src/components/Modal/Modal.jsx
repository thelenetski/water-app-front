import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modal/slice';
import { selectIsOpenModal } from '../../redux/modal/selectors';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import css from './Modal.module.css';

const ModalWindow = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModal);
  const [isBackdropActive, setBackdropActive] = useState(false);

  const onClose = () => dispatch(closeModal());

  useEffect(() => {
    if (isOpen) {
      setBackdropActive(true);
    } else {
      setBackdropActive(false);
    }
  }, [isOpen]);

  return createPortal(
    <div
      className={`${css.backdrop} ${isBackdropActive ? css.active : ''}`} 
      onClick={onClose}
    >
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Notification
          </Typography>
          <Button onClick={onClose} variant="contained" color="error">
            Close
          </Button>
        </Box>
      </Modal>
    </div>,
    document.getElementById('modal-root')
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '1px solid #777',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

export default ModalWindow;
