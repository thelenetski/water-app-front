import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modal/slice";
import { selectIsOpenModal } from "../../redux/modal/selectors";
import styles from "./ModalWindow.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const ModalWindow = ({ children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModal);

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    isOpen
      ? document.body.classList.add("no-scroll")
      : document.body.classList.remove("no-scroll");
  }, [isOpen]);

  return createPortal(
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModalHandler}
        className={styles.modalWrapper}
        ariaHideApp={false}
        overlayClassName={styles.modalOverlay}
      >
        <button className={styles.btnClose} onClick={closeModalHandler}>
          <svg>
            <use href="/sprite.svg#icon-x"></use>
          </svg>
        </button>
        <div className={styles.modalContent}>{children}</div>
      </Modal>
    </>,
    document.getElementById("modal-root")
  );
};

export default ModalWindow;
