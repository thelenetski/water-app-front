import React, { useState, useRef, useEffect } from "react";
import css from "./UserBar.module.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import UserBarPopover from "../UserBarPopover/UserBarPopover";
import defaultAvatar from "../UserBar/user-avatar.png";

const UserBar = () => {
  const [isShow, setIsShow] = useState(false);
  const userInfo = useSelector(selectUser) || {};
  const avatar = userInfo.avatar || defaultAvatar;

  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (buttonRef.current && buttonRef.current.contains(e.target)) {
      return;
    }
    if (popoverRef.current && popoverRef.current.contains(e.target)) {
      return;
    }
    setIsShow(false);
  };

  useEffect(() => {
    if (isShow) {
      document.addEventListener("mousedown", handleOutsideClick);
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

  return (
    <div className={css.userBarContainer}>
      <button
        type="button"
        onClick={togglePopover}
        className={css.button}
        ref={buttonRef}
      >
        <p className={css.name}>{userInfo?.name || "User"}</p>
        <img src={avatar} alt="User Avatar" className={css.avatar} />
        {isShow ? (
          <FaChevronUp style={{ color: "#ffffff" }} />
        ) : (
          <FaChevronDown style={{ color: "#ffffff" }} />
        )}
      </button>

      {isShow && (
        <div ref={popoverRef} className={css.popover}>
          <UserBarPopover />
        </div>
      )}
    </div>
  );
};

export default UserBar;
