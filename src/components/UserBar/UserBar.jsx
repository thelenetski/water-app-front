import css from "./UserBar.module.css";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import defaultAvatar from "../../images/avatar.png";
// import { selectUser } from "../../redux/user/selectors";

const UserBar = ({ onClick, isShow }) => {
  const userInfo = useSelector(selectUser); // треба селектор
  const avatar = userInfo?.avatar || defaultAvatar; // Треба фото

  return (
    <button type="button" onClick={onClick} className={css.button}>
      <p>{userInfo.name || "User"}</p>
      <img src={avatar} alt="User Avatar" className={css.avatar} />
      {isShow ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
    </button>
  );
};

export default UserBar;
