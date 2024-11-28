import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import css from "./UserBarPopover.module.css";
import {
  modalTypes,
  openEditUser,
  openConfirmLogOutUser,
} from "../../redux/modal/slice";
import {
  selectTypeModal,
  selectIsOpenModal,
} from "../../redux/modal/selectors";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal";
import LogOutModal from "../LogOutModal/LogOutModal";

const UserBarPopover = ({ userBarWidth }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModal);
  const type = useSelector(selectTypeModal);

  const openSettingsModal = () => {
    dispatch(openEditUser(null));
  };

  const openLogOutModal = () => {
    dispatch(openConfirmLogOutUser(null));
  };

  const closeModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className={css.popover} style={{ width: `${userBarWidth}px` }}>
      <button
        type="button"
        className={css.settings}
        onClick={openSettingsModal}
      >
        <IoSettingsOutline className={css.iconSettings} />
        Settings
      </button>

      <button type="button" className={css.logOut} onClick={openLogOutModal}>
        <IoLogOutOutline className={css.iconLogOut} />
        Log out
      </button>

      {isOpen && type === modalTypes.editUser && (
        <UserSettingsModal onClose={closeModal} />
      )}
      {isOpen && type === modalTypes.confirmLogOutUser && (
        <LogOutModal onClose={closeModal} />
      )}
    </div>
  );
};

export default UserBarPopover;
