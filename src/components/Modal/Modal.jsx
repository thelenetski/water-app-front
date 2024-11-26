import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/modal/slice";
import {
  selectIsOpenModal,
  selectTypeModal,
  selectContentModal,
} from "../../redux/modal/selectors";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import css from "./Modal.module.css";
import { modalTypes } from "../../redux/modal/slice";
import { WaterModal } from "../WaterModal/WaterModal";

const ModalWindow = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModal);
  const type = useSelector(selectTypeModal);
  const content = useSelector(selectContentModal);

  const onClose = () => {
    dispatch(closeModal());
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={css.modalBackdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={css.modalContainer}>
        <button
          className={css.btnClose}
          onClick={onClose}
          aria-label="Close Modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke="#323F47"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <main>
          {type === modalTypes.addWater || type === modalTypes.editWater ? (
            <WaterModal type={type} data={content} />
          ) : (
            <p>No content for this modal type.</p>
          )}
        </main>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

ModalWindow.propTypes = {
  children: PropTypes.node,
};

export default ModalWindow;
