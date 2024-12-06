import { useDispatch, useSelector } from "react-redux";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import css from "./UserBarPopover.module.css";
import { openEditUser, openConfirmLogOutUser } from "../../redux/modal/slice";
import { selectTypeModal } from "../../redux/modal/selectors";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

const UserBarPopover = forwardRef(({ userBarWidth }, ref) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const type = useSelector(selectTypeModal);

  const openSettingsModal = () => {
    dispatch(openEditUser());
  };

  const openLogOutModal = () => {
    dispatch(openConfirmLogOutUser());
  };

  return (
    <div
      ref={ref}
      className={css.popover}
      style={{ width: `${userBarWidth}px` }}
    >
      <button
        type="button"
        className={css.settings}
        onClick={openSettingsModal}
      >
        <IoSettingsOutline className={css.iconSettings} />
        {t("UserBarPopover.btnIconSettings")}
      </button>

      <button type="button" className={css.logOut} onClick={openLogOutModal}>
        <IoLogOutOutline className={css.iconLogOut} />
        {t("UserBarPopover.btnIconLogout")}
      </button>
    </div>
  );
});

export default UserBarPopover;
