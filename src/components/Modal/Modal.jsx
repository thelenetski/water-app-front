import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import ModalBackdrop from "./Modal.jsx";
import { ANIMATION } from "../../constants.js";
import { ModalContext } from "../../context/ModalContext.js"; 

const modalRoot = document.querySelector("#modal-root");

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);

  const handleSetModal = useCallback((modal = null) => {
    const id = setTimeout(() => {
      setModal(modal);
      clearTimeout(id);
    }, ANIMATION.DURATION);
  }, []);

  return (
    <ModalContext.Provider value={handleSetModal}>
      {children}
      {modal &&
        createPortal(
          <ModalBackdrop onClose={handleSetModal}>{modal}</ModalBackdrop>,
          modalRoot
        )}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
