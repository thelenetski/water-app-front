import React, { useState } from "react";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import css from "./UserBarPopover.module.css";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal";
// import LogOutModal from "./LogOutModal/LogOutModal";

const UserBarPopover = ({ userBarWidth }) => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);

  const openLogOutModal = () => setIsLogOutModalOpen(true);
  const closeLogOutModal = () => setIsLogOutModalOpen(false);

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

      {isSettingsModalOpen && (
        <UserSettingsModal onClose={closeSettingsModal} />
      )}
      {isLogOutModalOpen && <LogOutModal onClose={closeLogOutModal} />}
    </div>
  );
};

export default UserBarPopover;
