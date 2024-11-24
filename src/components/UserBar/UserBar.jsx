import css from "./UserBar.module.css";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useSelector } from "react-redux";
// import { selectUser } from "../../redux/user/selectors";

const UserBar = ({ onClick, isShow }) => {
  const userInfo = useSelector(selectUser); //додала поки такий селектор
  const avatar = "../../images/avatar.png";
  return (
    <>
      <button type="button" onClick={onClick} className={css.button}>
        <p>{userInfo.name || "User"}</p>
        <img />
        {isShow ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
      </button>
    </>
  );
};

export default UserBar;
