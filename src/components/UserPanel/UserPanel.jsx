import UserBar from "../UserBar/UserBar.jsx";
import css from "../UserPanel/UserPanel.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors.js";

const UserPanel = () => {
  const userInfo = useSelector(selectUser) || {};
  return (
    <div className={css.userPanelContainer}>
      <p className={css.greetings}>
        Hello
        <span className={css.greetingsName}>, {userInfo.name || "User"}!</span>
      </p>
      <UserBar name={userInfo.name || "User"} />
    </div>
  );
};

export default UserPanel;
