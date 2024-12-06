import UserBar from "../UserBar/UserBar.jsx";
import css from "../UserPanel/UserPanel.module.css";
import { selectUser, selectUserLoading } from "../../redux/user/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const UserPanel = () => {
  const { t } = useTranslation();
  const userInfo = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);

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
    const userText = t("UserPanel.nameUser")
    return userText 
  };

  return (
    <div className={css.userPanelContainer}>
      <p className={css.greetings}>
        {t("UserPanel.panelHello")}
        {!loading.main && (
          <span className={css.greetingsName}>, {getDisplayName()}!</span>
        )}
      </p>
      <UserBar
        name={userInfo !== null ? userInfo.data.name : t("UserPanel.nameUser")}
      />
    </div>
  );
};

export default UserPanel;
