import  WaterForm  from "../WaterForm/WaterForm";
import css from "./WaterModal.module.css";
import { modalTypes } from "../../redux/modal/slice";
import { selectTypeModal } from "../../redux/modal/selectors";
import { useSelector } from "react-redux";


export const WaterModal = () => {
  const type = useSelector(selectTypeModal);

  return (
    <div className={css.waterModalWrapper}>
      {type !== null && (
        <h2 className={css.waterModalTitle}>
          {(type === modalTypes.addWater && "Add water") ||
            (type === modalTypes.editWater &&
              "Edit the entered amount of water")}
        </h2>
      )}
      <WaterForm />
    </div>
  );
};

export default WaterModal;