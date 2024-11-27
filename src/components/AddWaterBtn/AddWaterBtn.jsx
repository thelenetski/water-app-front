import { useState } from "react";
import css from "./AddWaterBtn.module.css";
import { FaPlus } from "react-icons/fa6";
import clsx from "clsx";
import { WaterModal } from "../WaterModal/WaterModal";

const AddWaterBtn = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const classes = (mainClass) =>
    clsx(mainClass, {
      [css.waterMain]: section === "waterMain",
      [css.daily]: section === "daily",
    });


  return (
    <>
      <button
        onClick={openModal}
        type="button"
        className={classes(css.wrapper)}
      >
        <FaPlus className={classes(css.plusIcon)} />
        <p className={classes(css.text)}>Add water</p>
      </button>

      <BaseModal isOpen={isOpen} onClose={onCloseModal}>
        <WaterModal type={"add"} onClose={onCloseModal} />
      </BaseModal>
    </>
  )
}

export default AddWaterBtn