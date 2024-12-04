import { useDispatch, useSelector } from "react-redux";
import css from "./LogOutModal.module.css";
import { logOut } from "../../redux/auth/operations";
import { closeModal } from "../../redux/modal/slice";
import toast from "react-hot-toast";
import { selectUserLoading } from "../../redux/user/selectors";

const LogOutModal = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectUserLoading);

  const handleLogout = () => {
    dispatch(logOut())
      .unwrap()
      .then(() => {
        dispatch(closeModal());
      })
      .catch((error) => {
        toast.error("Logout failed: " + error.message);
      });
  };

  return (
    <div className={css.logoutModal}>
      <h2 className={css.title}>Log out</h2>
      <p className={css.text}>Do you really want to leave?</p>
      <div className={css.btnBlock}>
        <button
          className={`${css.btn} ${css.logoutBtn} ${loading && css.btnDisabled}`}
          onClick={handleLogout}
        >
          {loading ? "Logging out..." : "Log out"}
        </button>
        <button
          type="button"
          className={`${css.btn} ${loading ? css.btnDisabled : css.cancelBtn}`}
          onClick={() => dispatch(closeModal())}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
