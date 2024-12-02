import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modal/slice";
import { selectIsOpenModal } from "../../redux/modal/selectors";
import styles from "./ModalWindow.module.css";
import { createPortal } from "react-dom";

const ModalWindow = ({ children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModal);

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  // const customStyles = {
  //   content: {
  //     top: "50%",
  //     left: "50%",
  //     transform: "translate(-50%, -50%)",
  //     padding: "40px",
  //     borderRadius: "15px",
  //     backgroundColor: "#ffffff",
  //     boxShadow: "0 4px 50px rgba(0, 0, 0, 0.1)",
  //     width: "fit-content",
  //     height: "fit-content",
  //   },
  // };

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
