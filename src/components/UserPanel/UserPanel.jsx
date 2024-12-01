import UserBar from "../UserBar/UserBar.jsx";
import css from "../UserPanel/UserPanel.module.css";
import { selectUser } from "../../redux/user/selectors";
import { useSelector } from "react-redux";

const UserPanel = () => {
  const userInfo = useSelector(selectUser) || {};

  return (
    <div className={css.userPanelContainer}>
      <p className={css.greetings}>
        Hello
        <span className={css.greetingsName}>
          ,{" "}
          {userInfo.data !== null
            ? userInfo.data.name || userInfo.data.email
            : "User"}
          !
        </span>
      </p>
      <UserBar name={userInfo.data !== null ? userInfo.data.name : "User"} />
    </div>
  );
};

export default UserPanel;
