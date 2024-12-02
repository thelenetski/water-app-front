import { useDispatch } from "react-redux";
import css from "./WaterItem.module.css";
import sprite from "../../../public/sprite.svg";
import { openConfirmDelete, openEditWater } from "../../redux/modal/slice";

export function WaterItem({ item }) {
  const dispatch = useDispatch();

  const water =
    item?.waterValue >= 999
      ? Math.round((item?.amount / 1000) * 100) / 100 + " L"
      : item?.amount + " ml";

  return (
    <div className={css.card}>
      <svg className={css.bottleIcon}>
        <use href={sprite + "#icon-water-glass"}></use>
      </svg>
      <div className={css.textBox}>
        <p className={css.ml}>{water}</p>
        <p className={css.time}>
          {new Date(item?.createdAt).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
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
    </div>
  );
}
