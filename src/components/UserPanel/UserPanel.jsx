import UserBar from "../UserBar/UserBar.jsx";
import css from "../UserPanel/UserPanel.module.css";
import { selectUser } from "../../redux/user/selectors";
import { useSelector } from "react-redux";

const UserPanel = () => {
  const userInfo = useSelector(selectUser);

  const truncateWithEllipsis = (string, maxLength) => {
    if (string.length > maxLength) {
      return string.slice(0, maxLength) + "...";
    }
    return string;
  };

  const getDisplayName = () => {
    if (userInfo?.data?.name?.trim()) {
      return truncateWithEllipsis(userInfo.data.name, 10);
    } else if (userInfo?.data?.email) {
      return truncateWithEllipsis(userInfo.data.email.split("@")[0], 10);
    }
    return "User";
  };

  return (
    <div className={css.userPanelContainer}>
      <p className={css.greetings}>
        Hello
        <span className={css.greetingsName}>, {getDisplayName()}!</span>
      </p>
      <UserBar name={userInfo !== null ? userInfo.data.name : "User"} />
    </div>
  );
};

export default UserPanel;
