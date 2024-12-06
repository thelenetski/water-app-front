import { useDispatch, useSelector } from "react-redux";
import css from "./DeleteModal.module.css";
import { closeModal } from "../../redux/modal/slice";
import toast from "react-hot-toast";
import { deleteWater } from "../../redux/waters/operations";
import { selectLoading } from "../../redux/waters/selectors";
import { selectContentModal } from "../../redux/modal/selectors";
import { useTranslation } from "react-i18next";

const DeleteModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const contentModal = useSelector(selectContentModal);

  const handleDelete = () => {
    dispatch(deleteWater(contentModal?._id))
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        toast.success(t("DeleteModal.success"));
      })
      .catch((error) => {
        toast.error(t("DeleteModal.error")) + error.message;
      });
  };

  return (
    <div className={css.deleteModal}>
      <h2 className={css.title}>{t("DeleteModal.delete")}</h2>
      <p className={css.text}>{t("DeleteModal.Are")}</p>
      <div className={css.buttonDelWrapper}>
          <button
            type="button"
            className={`${css.btn} ${css.deleteBtn} ${loading.main && css.btnDisabled}`}
            onClick={handleDelete}
          >
            {loading.main ? t("DeleteModal.Deleting") : t("DeleteModal.Delete")}
          </button>
          <button
            type="button"
            className={`${css.btn} ${css.cancelBtn}`}
            onClick={() => dispatch(closeModal())}
          >
            {t("DeleteModal.Cancel")}
          </button>
      </div>
    </div>
  );
};

export default DeleteModal;
