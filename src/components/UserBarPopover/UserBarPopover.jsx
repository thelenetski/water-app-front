import css from "./UserBarPopover.module.css";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
const UserBarPopover = ({ openSettingModal, openLogOutModal }) => {
  return (
    <div className={css.popover}>
      <button type="button" onClick={openSettingModal} className={css.settings}>
        <IoSettingsOutline className={css.iconSettings} />
        Setting
      </button>

      <button type="button" onClick={openLogOutModal} className={css.logOut}>
        <IoLogOutOutline className={css.iconLogOut} />
        Log out
      </button>
    </div>
  );
};

export default UserBarPopover;
