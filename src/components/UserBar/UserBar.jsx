import { useState, useRef, useEffect } from "react";
import css from "./UserBar.module.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import UserBarPopover from "../UserBarPopover/UserBarPopover";
import defaultAvatar from "../../img/default-avatar.webp";

const UserBar = () => {
  const [isShow, setIsShow] = useState(false);
  const [userBarWidth, setUserBarWidth] = useState(0);
  const userInfo = useSelector(selectUser) || {};
  const avatar = userInfo.avatarUrl || defaultAvatar;

  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (
      (buttonRef.current && buttonRef.current.contains(e.target)) ||
      (popoverRef.current && popoverRef.current.contains(e.target))
    ) {
      return;
    }
    setIsShow(false);
  };

  useEffect(() => {
    if (isShow) {
      document.addEventListener("mousedown", handleOutsideClick);
      if (buttonRef.current) {
        setUserBarWidth(buttonRef.current.offsetWidth);
      }
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isShow]);

  const togglePopover = () => {
    setIsShow((prev) => !prev);
  };

  const getDisplayName = () => {
    if (userInfo?.data?.name?.trim()) {
      return userInfo.data.name;
    } else if (userInfo?.data?.email) {
      return userInfo.data.email.split("@")[0];
    }
    return "User";
  };

  return (
    <div className={css.userBarContainer}>
      <button
        type="button"
        onClick={togglePopover}
        className={css.button}
        ref={buttonRef}
      >
        <p className={css.name}>{getDisplayName()}</p>
        <img src={avatar} alt="User Avatar" className={css.avatar} />
        {isShow ? (
          <FaChevronUp style={{ color: "#ffffff" }} />
        ) : (
          <FaChevronDown style={{ color: "#ffffff" }} />
        )}
      </button>

      {isShow && (
        <UserBarPopover ref={popoverRef} userBarWidth={userBarWidth} />
      )}
    </div>
  );
};

export default UserBar;
