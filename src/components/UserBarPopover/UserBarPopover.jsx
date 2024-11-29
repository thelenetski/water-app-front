import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import css from "./UserBarPopover.module.css";
import {
  modalTypes,
  openEditUser,
  openConfirmLogOutUser,
} from "../../redux/modal/slice";
import { selectTypeModal } from "../../redux/modal/selectors";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal";
import LogOutModal from "../LogOutModal/LogOutModal";
import ModalWindow from "../ModalWindow/ModalWindow";
const UserBarPopover = ({ userBarWidth }) => {
  const dispatch = useDispatch();
  const type = useSelector(selectTypeModal);

  const openSettingsModal = () => {
    dispatch(openEditUser());
  };

  const openLogOutModal = () => {
    dispatch(openConfirmLogOutUser());
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
      <ModalWindow>
        {type === modalTypes.editUser && <UserSettingsModal />}
        {type === modalTypes.confirmLogOutUser && <LogOutModal />}
      </ModalWindow>
    </div>
  );
};

export default UserBarPopover;
