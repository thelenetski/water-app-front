import { useDispatch } from "react-redux";
import css from "./WaterItem.module.css";
import sprite from "../../../public/sprite.svg";
import { BaseModal } from "../BaseModal/BaseModal";
import { WaterModal } from "../WaterModal/WaterModal";
import { DeleteModal } from "../DeleteModal/DeleteModal";
import { ModalWindow } from "../globalModal/globalModal";
import { addWater, deleteWater, patchWater } from "../../redux/waters/operations";
import { closeModal, openConfirmDelete} from "../../redux/modal/slice";

export function WaterItem({ item }) {
  const dispatch = useDispatch();

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
        <button className={css.button} type="button" onClick={()=>{dispatch(patchWater)}}>
          <svg className={css.btnIcon}>
            <use href={sprite + "#icon-edit"}></use>
          </svg>
        </button>
        <button className={css.button} type="button" onClick={()=>{dispatch(deleteWater)}}>
          <svg className={css.btnIcon}>
            <use href={sprite + "#icon-trash"}></use>
          </svg>
        </button>
      </div>

      <div>
        <BaseModal isOpen={dispatch(addWater)} onClose={dispatch(closeModal)}>
          <WaterModal mode={"edit"} onClose={()=>{dispatch(closeModal)}} water={item} />
        </BaseModal>
      </div>

      <ModalWindow
        isOpen={dispatch(openConfirmDelete)}
        title={"Delete"}
        onRequestClose={dispatch(closeModal)}
      >
        <DeleteModal onRequestClose={dispatch(openConfirmDelete)} water={item} />
      </ModalWindow>
    </div>
  );
}