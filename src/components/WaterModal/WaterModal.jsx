import { WaterForm } from "../WaterForm/WaterForm";
import css from "./WaterModal.module.css";
import { modalTypes } from "../../redux/modal/slice/";


export const WaterModal = ({ type, data }) => {

  return (
    <div className={css.waterModalWrapper}>
      {type !== null && (
        <h2 className={css.waterModalTitle}>
          {(type === modalTypes.addWater && "Add water") ||
            (type === modalTypes.editWater &&
              "Edit the entered amount of water")}
        </h2>
      )}
      <WaterForm type={type} data={data} />
    </div>
  );
};