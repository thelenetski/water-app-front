import { useDispatch } from "react-redux";
import css from "./LogOutModal.module.css";
import { logOut } from "../../redux/auth/operations";
import { closeModal } from "../../redux/modal/slice";
import toast from "react-hot-toast";

export const LogOutModal = () => {
  const dispatch = useDispatch();

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
      <button
        type="button"
        className={`${css.btn} ${css.logoutBtn}`}
        onClick={handleLogout}
      >
        Log out
      </button>
      <button
        type="button"
        className={`${css.btn} ${css.cancelBtn}`}
        onClick={() => dispatch(closeModal())}
      >
        Cancel
      </button>
    </div>
  );
};
