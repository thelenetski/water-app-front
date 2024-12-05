import  WaterForm  from "../WaterForm/WaterForm";
import css from "./WaterModal.module.css";
import { modalTypes } from "../../redux/modal/slice";
import { selectTypeModal } from "../../redux/modal/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export const WaterModal = () => {
  const { t } = useTranslation(); // Хук для отримання перекладів
  const type = useSelector(selectTypeModal);

  return (
    <div className={css.waterModalWrapper}>
      {type !== null && (
        <h2 className={css.waterModalTitle}>
          {(type === modalTypes.addWater && t("modal.addWater")) ||
            (type === modalTypes.editWater && t("modal.editWater"))}
        </h2>
      )}
      <WaterForm />
    </div>
  );
};

export default WaterModal;