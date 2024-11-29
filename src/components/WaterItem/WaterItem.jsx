import { useDispatch, useSelector } from "react-redux";
import css from "./WaterItem.module.css";
import sprite from "../../../public/sprite.svg";
import { WaterModal } from "../WaterModal/WaterModal";
import { DeleteModal } from "../DeleteModal/DeleteModal";
import { ModalWindow } from "../globalModal/globalModal";
import {
  modalTypes,
  openConfirmDelete,
  openEditWater,
} from "../../redux/modal/slice";
import { selectTypeModal } from "../../redux/modal/selectors";

export function WaterItem({ item }) {
  const dispatch = useDispatch();

  const type = useSelector(selectTypeModal);

  const water =
    item.waterValue >= 999
      ? Math.round((item.waterValue / 1000) * 100) / 100 + " L"
      : item.waterValue + " ml";

  return (
    <div className={css.card}>
      <svg className={css.bottleIcon}>
        <use href={sprite + "#icon-water-glass"}></use>
      </svg>
      <div className={css.textBox}>
        <p className={css.ml}>{water}</p>
        <p className={css.time}>{item.localTime}</p>
      </div>
      <div className={css.btnBox}>
        <button
          className={css.button}
          type="button"
          onClick={() => {
            dispatch(openEditWater(item));
          }}
        >
          <svg className={css.btnIcon}>
            <use href={sprite + "#icon-edit"}></use>
          </svg>
        </button>
        <button
          className={css.button}
          type="button"
          onClick={() => {
            dispatch(openConfirmDelete(item));
          }}
        >
          <svg className={css.btnIcon}>
            <use href={sprite + "#icon-trash"}></use>
          </svg>
        </button>
      </div>

      <ModalWindow>
        {type === modalTypes.editWater && <WaterModal water={item} />}
        {type === modalTypes.confirmDelete && <DeleteModal water={item} />}
      </ModalWindow>
    </div>
  );
}
