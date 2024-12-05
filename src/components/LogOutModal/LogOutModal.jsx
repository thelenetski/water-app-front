import { useDispatch, useSelector } from "react-redux";
import css from "./LogOutModal.module.css";
import { logOut } from "../../redux/auth/operations";
import { closeModal } from "../../redux/modal/slice";
import toast from "react-hot-toast";
import { selectUserLoading } from "../../redux/user/selectors";
import { useTranslation } from "react-i18next";

const LogOutModal = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectUserLoading);
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logOut())
      .unwrap()
      .then(() => {
        dispatch(closeModal());
      })
      .catch((error) => {
        toast.error(t("logOutModal.logoutFailed", { message: error.message }));
      });
  };

  return (
    <div className={css.logoutModal}>
      <h2 className={css.title}>{t("logOutModal.logOut")}</h2>
      <p className={css.text}>{t("logOutModal.text")}</p>
      <button
        className={`${css.btn} ${css.logoutBtn} ${loading && css.btnDisabled}`}
        onClick={handleLogout}
      >
        {loading ? t("logOutModal.butLoggingOut") : t("logOutModal.butLogOut")}
      </button>
      <button
        type="button"
        className={`${css.btn} ${css.cancelBtn}`}
        onClick={() => dispatch(closeModal())}
      >
        {t("logOutModal.butCancel")}
      </button>
    </div>
  );
};

export default LogOutModal;
