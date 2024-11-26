import css from "./UserBar.module.css";
import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import { userModal } from "../../redux/modal/slice";
import UserBarPopover from "../UserBarPopover/UserBarPopover";
import defaultAvatar from "../UserBar/user-avatar.png";

const UserBar = () => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const userInfo = useSelector(selectUser) || {};
  const avatar = userInfo.avatar || defaultAvatar;

  const togglePopover = () => {
    setIsShow((prevState) => !prevState);
    dispatch(userModal());
  };
  return (
    <div className={css.userBarContainer}>
      <button type="button" onClick={togglePopover} className={css.button}>
        <p className={css.name}>{userInfo?.name || "User"}</p>
        <img src={avatar} alt="User Avatar" className={css.avatar} />
        {isShow ? (
          <FaChevronUp style={{ color: "#ffffff" }} />
        ) : (
          <FaChevronDown style={{ color: "#ffffff" }} />
        )}
      </button>
      {isShow && <UserBarPopover />}
    </div>
  );
};

export default UserBar;
